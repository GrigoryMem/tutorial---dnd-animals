import KonvaFactory from '../factories/KonvaFactory';
import { Stage } from 'konva/lib/Stage';
import { Layer } from 'konva/lib/Layer';
import { AnimalWithImages, AnimalsWithImages } from '../types/data';
import { Image } from 'konva/lib/shapes/Image';
import CursorManager from '../helpers/cursorManager';
import AnimalManager from './animalManager';
// import cursorManager from '../helpers/cursorManager';
// import cursorManager from '../helpers/cursorManager';
// import { CursorManager } from '../helpers/cursorManager'

export default class Game {
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

    var score = 3;

    // image positions
    // Определяются позиции животных 
    // (animals) и их контуров (outlines).
  

    // create draggable animals
    for (let animalName in this.animalsWithImages) {
      // anonymous function to induce scope
      (function (that) {
        let  anim:AnimalWithImages = that.animalsWithImages[animalName];

        let konvaAnimal:Image = that.konvaFactory.createImage(anim);
        let konvaAnimalDrop:Image = that.konvaFactory.createDropImage(anim);

        new AnimalManager(konvaAnimal, konvaAnimalDrop);

        
      

        animalDropLayer.add(animalDropImage);
        animalLayer.add(animal);
     
      })(this);
    }
    
    

  
  }

 

}