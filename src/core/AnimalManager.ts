import { Image } from "konva/lib/shapes/Image";
import CursorManager from '../helpers/cursorManager';

import AnimalEventObserver, { AnimalEventSubject, EAnimalEvents } from "../types/AnimalEventObserver";
// AnimalManager контролирует движение, 
//проверяет правильное размещение и управляет курсором.
// По сути, код делает так, чтобы пользователь перетаскивал животное 
// в правильную зону, а при наведении
//  и уходе менялись изображения (например, светящийся эффект).

export default class AnimalManager implements AnimalEventSubject {
  // обозначим массив наблюдателей:
  private observers: AnimalEventObserver[] = [];
  constructor(
    private readonly konvaAnimal: Image, 
    private readonly konvaAnimalDrop: Image,
    
    imageOrigin: HTMLImageElement,
    imageGlow: HTMLImageElement,
    ) {
    
      this.cacheAndDraw(this.konvaAnimal);
      // Перетаскиваемое изображение выводится наверх, чтобы быть выше других слоев.
    konvaAnimal.on('dragstart',this.onDragStart.bind(this));
    /*
     * check if animal is in the right spot and
     * snap into place if it is
     */
    konvaAnimal.on('dragend', this.onDragEnd.bind(this));
    // make animal glow on mouseover
    // Меняет курсор на указатель (CursorManager.setPointCursor();).
    konvaAnimal.on('mouseover', this.onMouseOver.bind(this, imageOrigin));
    // return animal on mouseout
    konvaAnimal.on('mouseout', this.onMouseOut.bind(this, imageGlow));
    // Проверяет, находится ли объект в нужном месте (isNearOutline).
    konvaAnimal.on('dragmove', this.onDragMove.bind(this));
  }
  // Когда пользователь начинает тянуть животное
  onDragStart ():void {
    this.konvaAnimal.moveToTop();
    // оповещаем все подсписчиков что началось перетескивание животного
    this.notifyObservers(EAnimalEvents.DRAG_START)

  }
  // Когда отпускает (onDragEnd()) → проверяется,
  //  попало ли животное в нужное место (isNearOutline()).
  onDragEnd ():void {
    // Когда животное отпускается, AnimalManager проверяет, 
    // находится ли оно рядом с нужным местом (isNearOutline()).   
    if (!this.isNearOutline(this.konvaAnimal, this.konvaAnimalDrop)) {
      // Если животное не попало в нужную зону: 
      // передаем что событие не успешное
      this.notifyObservers(EAnimalEvents.DRAG_END,{success:false})
      return
    }
    // Если животное попало в нужную зону:
    // Оно фиксируется в правильном месте.
    this.konvaAnimal.position({
        x:  this.konvaAnimalDrop.x(),
        y:  this.konvaAnimalDrop.y(),
      });
      // прекратить перетаскивание
      // Перестает быть перетаскиваемым.
      this.konvaAnimal.draggable(false);
      // отписываемся от всех событий
      this.konvaAnimal.off(
        'dragstart dragend mouseover')
      // Отправляется событие EAnimalEvents.DRAG_END 
      // всем подписчикам через notifyObservers().
    // при успешном попадании в паз
    // DRAG_END - событие,  "пользователь отпустил объект"
    // data.success — указывает, правильно ли размещено животное
      this.notifyObservers(EAnimalEvents.DRAG_END,{success:true})
  
      // Если нет → уведомление отправляется без success, или он равен false.
    }
  

  onMouseOver (imageGlow: HTMLImageElement):void {
    this.konvaAnimal.image(imageGlow);
    // document.body.style.cursor = 'pointer';
    this.cacheAndDraw(this.konvaAnimal);
    CursorManager.setPointCursor();
    }
  onMouseOut (imageOrigin: HTMLImageElement):void {
   
      this.konvaAnimal.image(imageOrigin);
      this.cacheAndDraw(this.konvaAnimal);
      // document.body.style.cursor = 'default';
      CursorManager.setDefaultCursor();
    
  }
  // Когда пользователь перетаскивает животное
  onDragMove():void{
    // document.body.style.cursor = 'pointer';
    CursorManager.setGrabbingCursor();
  }
  

  isNearOutline(animal: Image, animalDropImage: Image):boolean {
    // Этот метод проверяет, близко ли перетащенное животное к нужному месту(пазу)
    const a: Image = animal;
    const o: Image = animalDropImage;
    const ax: number = a.x();
    const ay: number = a.y();

    return ax > o.x() - 20 && ax < o.x() + 20 && ay > o.y() - 20 && ay < o.y() + 20
    
  }

  cacheAndDraw(image: Image) {
    // const width = image.width()/2; 
      image.cache({
        pixelRatio: 3,
        // width,
      }); // Запоминает картинку (делает её "фото")
      image.drawHitFromCache(); // Создаёт хитбокс(четкие границы) на основе "фото"
// cache() запоминает изображение, чтобы не перерисовывать его каждый раз.
// drawHitFromCache() делает хитбокс четким, чтобы Konva быстрее понимал, когда мышь касается изображения.
  }
  // паттерн Observer
 // оповещение наблюдателей
  notifyObservers(eventType: EAnimalEvents, data?: any): void {
    this.observers.forEach((o:AnimalEventObserver)=>{
      o.update(eventType,data)

    })
  }
  // подписка наблюдателй
  subscribe(observer:AnimalEventObserver):void {
    if(this.observers.includes(observer)) return;

    this.observers.push(observer);
  }
  // отписка наблюдателей
  unsubscribe(observer:AnimalEventObserver):void {
    const observerIndex: number = this.observers.indexOf(observer);
    if(observerIndex !== -1) {
      this.observers.splice(observerIndex, 1);
    }
  }
  
}