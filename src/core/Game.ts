import KonvaFactory from '../factories/KonvaFactory';
import { Stage } from 'konva/lib/Stage';
import { Layer } from 'konva/lib/Layer';
import { AnimalWithImages, AnimalsWithImages } from '../types/data';
import { Image } from 'konva/lib/shapes/Image';


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
      

        animal.on('dragstart', function () {
          this.moveToTop();
        });
        /*
         * check if animal is in the right spot and
         * snap into place if it is
         */
        animal.on('dragend', function () {
         
          if (!animal.inRightPlace && that.isNearOutline(animal, anim.drop)) {
            animal.position({
              x:  anim.drop.x,
              y:  anim.drop.y,
            });
            animal.inRightPlace = true;

            if (++score >= 4) {
              var text = 'You win! Enjoy your booty!';
              that.drawBackground(backgroundLayer, that.backgroundImage, text);
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
          document.body.style.cursor = 'pointer';
        });
        // return animal on mouseout
        animal.on('mouseout', function () {
          animal.image(anim.images.origin);
          document.body.style.cursor = 'default';
        });

        animal.on('dragmove', function () {
          document.body.style.cursor = 'pointer';
        });

        
       let outline:Image = that.konvaFactory.createDropImage(anim);

        animalDropLayer.add(outline);
        animalLayer.add(animal);
     
      })(this);
    }
    
    

  this.drawBackground(
    backgroundLayer,
    this.backgroundImage,
    'Ahoy! Put the animals on the beach!'
    );
  }

   isNearOutline(animal, outline) {
    var a = animal;
    var o = outline;
    var ax = a.x();
    var ay = a.y();

    if (ax > o.x - 20 && ax < o.x + 20 && ay > o.y - 20 && ay < o.y + 20) {
      return true;
    } else {
      return false;
    }
  }
   drawBackground(background, beachImg, text) {
    var context = background.getContext();
    context.drawImage(beachImg, 0, 0);
    context.setAttr('font', '20pt Calibri');
    context.setAttr('textAlign', 'center');
    context.setAttr('fillStyle', 'white');
    context.fillText(text, background.getStage().width() / 2, 40);
  }
}