import KonvaFactory from '../factories/KonvaFactory';
import { Stage } from 'konva/lib/Stage';
import { Layer } from 'konva/lib/Layer';
import { AnimalWithImages, AnimalsWithImages } from '../types/data';
import { Image } from 'konva/lib/shapes/Image';
import AnimalManager from './AnimalManager';
import AnimalEventObserver, { EAnimalEvents } from '../types/AnimalEventObserver';
import AudioService from '../services/AudioService';

// Game управляет сценой и животными.
export default class Game implements AnimalEventObserver {
  private score = 0;
  private readonly animalDropLayer: Layer
  private readonly animalLayer: Layer
  //функция будет пустой во избежании ошибки 
  private endGameCallBack = (): void =>{}
  
  constructor(
    private readonly konvaFactory: KonvaFactory,
    private readonly audioService: AudioService,
    private readonly animalsWithImages: AnimalsWithImages, 
) {
  // Создаёт сцену и три слоя для фона, 
  // животных и их "пазов" (куда их нужно поместить).
    // Создается сцена (stage) с заданными размерами.
    const stage:Stage = this.konvaFactory.createStage();
    // Создаются два слоя: background для
    //  фона и animalLayer для животных и их контуров.
    const backgroundLayer:Layer = this.konvaFactory.createLayer();
    this.animalDropLayer = this.konvaFactory.createLayer();
    this.animalLayer = this.konvaFactory.createLayer();
    
    stage.add(backgroundLayer);
    stage.add(this.animalDropLayer);
    stage.add(this.animalLayer);

    backgroundLayer.add(this.konvaFactory.createBackgroundImage())
  }

  start():void {
    // генерация животных
   //вычисляем score на основе количества животных
   this.score = Object.keys(this.animalsWithImages).length
   // create draggable animals
   
   for (let animalName in this.animalsWithImages) {
     // anonymous function to induce scope
   // Загружает изображения животных и их контуров.
       const   animalData:AnimalWithImages = this.animalsWithImages[animalName];
       const  konvaAnimal:Image = this.konvaFactory.createImage(animalData);
       const  konvaAnimalDrop:Image = this.konvaFactory.createDropImage(animalData);
       // Создаёт для каждого животного объект AnimalManager, 
       // который управляет перетаскиванием.
       const animalManager:AnimalManager = new AnimalManager(
         konvaAnimal, 
         konvaAnimalDrop,
         animalData.images.origin,
         animalData.images.glow,
        );
       //  Наблюдатель подписывается на издателя (subscribe(this)).
       //  Подписывается (subscribe()) на события от AnimalManager
        animalManager.subscribe(this)
        animalManager.subscribe(this.audioService);
         // отрисовка
       this.animalDropLayer.add(konvaAnimalDrop);
       this.animalLayer.add(konvaAnimal);
    }

  }

  restart():void {
    // Удаляет все созданные слоя и животные. - очистка
    this.animalDropLayer.destroyChildren();
    this.animalLayer.destroyChildren();
    // запуск игры после очистки:
    this.start();
  }

  onEndGame(fn:()=>void):void {
    // Подписывается на событие окончания игры.
    this.endGameCallBack = fn
  }

  onChangeScore(): void {
    if(--this.score!==0){
      return
    }
    this.audioService.playWin();
//вызывается по окончании игры
    this.endGameCallBack();
}
  // Так как Game подписан на AnimalManager, 
  // он получает это событие в своём методе update():
  update(eventType: EAnimalEvents, data?:any):void {
    if(eventType === EAnimalEvents.DRAG_END && data?.success) {
      // Метод onChangeScore() уменьшает счётчик животных (this.score). Когда все животные правильно размещены 
      // (this.score === 0), появляется сообщение "You win!".
      this.onChangeScore()
    }
  }
}