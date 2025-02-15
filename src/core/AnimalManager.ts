import { Image } from "konva/lib/shapes/Image";
import CursorManager from '../helpers/cursorManager';
import { AnimalImageElements } from "../types/image";
// По сути, код делает так, чтобы пользователь перетаскивал животное 
// в правильную зону, а при наведении
//  и уходе менялись изображения (например, светящийся эффект).
// AnimalManager контролирует движение, 
//проверяет правильное размещение и управляет курсором.
export default class AnimalManager {
  constructor(
    private readonly konvaAnimal: Image, 
    private readonly konvaAnimalDrop: Image,
    private readonly onDropSuccess:Function,
    htmlImages: AnimalImageElements['images'],

    ) {
      // Перетаскиваемое изображение выводится наверх, чтобы быть выше других слоев.
    konvaAnimal.on('dragstart',this.onDragStart.bind(this));
    /*
     * check if animal is in the right spot and
     * snap into place if it is
     */
    konvaAnimal.on('dragend', this.onDragEnd.bind(this));
    // make animal glow on mouseover
    // Меняет курсор на указатель (CursorManager.setPointCursor();).
    konvaAnimal.on('mouseover', this.onMouseOver.bind(this, htmlImages.glow));
    // return animal on mouseout
    konvaAnimal.on('mouseout', this.onMouseOut.bind(this,htmlImages.origin));
    // Проверяет, находится ли объект в нужном месте (isNearOutline).
    konvaAnimal.on('dragmove', this.onDragMove.bind(this));
  }

  onDragStart ():void {
    this.konvaAnimal.moveToTop();
  }

  onDragEnd ():void {
       
    if (!this.isNearOutline(this.konvaAnimal, this.konvaAnimalDrop)) {
      return
    }
    this.konvaAnimal.position({
        x:  this.konvaAnimalDrop.x(),
        y:  this.konvaAnimalDrop.y(),
      });
    // disable drag and drop
      setTimeout(()=>{
        this.konvaAnimal.draggable(false);
        this.onDropSuccess()
      }, 0);
    }
  

  onMouseOver (imageGlow: HTMLImageElement):void {
    this.konvaAnimal.image(imageGlow);
    // document.body.style.cursor = 'pointer';
    CursorManager.setPointCursor();
    }
  onMouseOut (imageOrigin: HTMLImageElement):void {
   
      this.konvaAnimal.image(imageOrigin);
      // document.body.style.cursor = 'default';
      CursorManager.setDefaultCursor();
    
  }

  onDragMove():void{
    // document.body.style.cursor = 'pointer';
    CursorManager.setGrabbingCursor();
  }
  

  isNearOutline(animal: Image, animalDropImage: Image):boolean {
    // Этот метод проверяет, близко ли перетащенное животное к нужному месту
    const a: Image = animal;
    const o: Image = animalDropImage;
    const ax: number = a.x();
    const ay: number = a.y();

    return ax > o.x() - 20 && ax < o.x() + 20 && ay > o.y() - 20 && ay < o.y() + 20
    
  }
}