import KonvaFactory from '../factories/KonvaFactory';
import { Stage } from 'konva/lib/Stage';
import { Layer } from 'konva/lib/Layer';
import { AnimalWithImages, AnimalsWithImages } from '../types/data';
import { Image } from 'konva/lib/shapes/Image';
import AnimalManager from './AnimalManager';

// Game управляет сценой и животными.
export default class Game {
  private score = 0;
  constructor(
    private readonly konvaFactory: KonvaFactory,
    private readonly animalsWithImages: AnimalsWithImages, 
) {
    // Создается сцена (stage) с заданными размерами.
    const stage:Stage = this.konvaFactory.createStage();
    // Создаются два слоя: background для
    //  фона и animalLayer для животных и их контуров.
    const backgroundLayer:Layer = this.konvaFactory.createLayer();
    const animalDropLayer:Layer = this.konvaFactory.createLayer();
    const animalLayer:Layer = this.konvaFactory.createLayer();
    
    stage.add(backgroundLayer);
    stage.add(animalDropLayer);
    stage.add(animalLayer);

    backgroundLayer.add(this.konvaFactory.createBackgroundImage(this.backgroundImage))



    // image positions
    // Определяются позиции животных 
    // (animals) и их контуров (outlines).
  
    //вычисляем score
    this.score = Object.keys(this.animalsWithImages).length
    // create draggable animals
    for (let animalName in this.animalsWithImages) {
      // anonymous function to induce scope
    
        const   animalData:AnimalWithImages = this.animalsWithImages[animalName];
        const  konvaAnimal:Image = this.konvaFactory.createImage(animalData);
        const  konvaAnimalDrop:Image = this.konvaFactory.createDropImage(animalData);

        new AnimalManager(
          konvaAnimal, 
          konvaAnimalDrop,
          this.onChangeScore.bind(this),
          animalData.images.origin,
          animalData.images.glow,
         );

        animalDropLayer.add(konvaAnimalDrop);
        animalLayer.add(konvaAnimal);
     }
  }

  onChangeScore(): void {
    if(--this.score!==0){
      return
    }
    alert('You win! Enjoy the game!');  
  }
}