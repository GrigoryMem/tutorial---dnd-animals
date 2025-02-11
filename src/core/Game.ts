import KonvaFactory from '../factories/KonvaFactory';
import { Stage } from 'konva/lib/Stage';
import { Layer } from 'konva/lib/Layer';
import { AnimalWithImages, AnimalsWithImages } from '../types/data';
import { Image } from 'konva/lib/shapes/Image';
import CursorManager from '../helpers/cursorManager';
// import cursorManager from '../helpers/cursorManager';
// import cursorManager from '../helpers/cursorManager';
// import { CursorManager } from '../helpers/cursorManager'

export default class Game {
  constructor(
    private readonly konvaFactory: KonvaFactory,
    private readonly animalsWithImages: AnimalsWithImages, 
    private readonly backgroundImage: HTMLImageElement) {
    // Создается сцена (stage) с заданными размерами.
   let stage:Stage = this.konvaFactory.createStage();
    // Создаются два слоя: background для
    //  фона и animalLayer для животных и их контуров.
    let backgroundLayer:Layer = this.konvaFactory.createLayer();
    let animalDropLayer:Layer = this.konvaFactory.createLayer();
    let animalLayer:Layer = this.konvaFactory.createLayer();
    
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

        let animal:Image = that.konvaFactory.createImage(anim);
        let animalDropImage:Image = that.konvaFactory.createDropImage(anim);

        animal.on('dragstart', function () {
          this.moveToTop();
        });
        /*
         * check if animal is in the right spot and
         * snap into place if it is
         */
        animal.on('dragend', function () {
         
          if (!animal.inRightPlace && that.isNearOutline(animal, animalDropImage)) {
            animal.position({
              x:  animalDropImage.x(),
              y:  animalDropImage.y(),
            });
            animal.inRightPlace = true;

            if (++score >= 4) {
              alert('You win! Enjoy your booty!');
            }

            // disable drag and drop
            setTimeout(function () {
              animal.draggable(false);
            }, 50);
          }
        });
        // make animal glow on mouseover
        animal.on('mouseover', function () {
          animal.image(anim.images.glow);
          // document.body.style.cursor = 'pointer';
          CursorManager.setPointCursor();
        
        });
        // return animal on mouseout
        animal.on('mouseout', function () {
          animal.image(anim.images.origin);
          // document.body.style.cursor = 'default';
          CursorManager.setDefaultCursor();
        });

        animal.on('dragmove', function () {
          // document.body.style.cursor = 'pointer';
          CursorManager.setPointCursor();
        });

        
      

        animalDropLayer.add(animalDropImage);
        animalLayer.add(animal);
     
      })(this);
    }
    
    

  
  }

   isNearOutline(animal: Image, animalDropImage: Image):boolean {
    const a: Image = animal;
    const o: Image = animalDropImage;
    const ax: number = a.x();
    const ay: number = a.y();

    return ax > o.x() - 20 && ax < o.x() + 20 && ay > o.y() - 20 && ay < o.y() + 20
    
  }

}