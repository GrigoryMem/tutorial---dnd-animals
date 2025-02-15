import { Image } from "konva/lib/shapes/Image";
import CursorManager from '../helpers/cursorManager';
import { AnimalImageElements } from "../types/image";
export default class AnimalManager {
  constructor(
    private readonly konvaAnimal: Image, 
    private readonly konvaAnimalDrop: Image,
    htmlImages: AnimalImageElements['images'],

    ) {
    konvaAnimal.on('dragstart',this.onDragStart.bind(this));
    /*
     * check if animal is in the right spot and
     * snap into place if it is
     */
    konvaAnimal.on('dragend', this.onDragEnd.bind(this));
    // make animal glow on mouseover
    konvaAnimal.on('mouseover', this.onMouseOver.bind(this, htmlImages.glow));
    // return animal on mouseout
    konvaAnimal.on('mouseout', this.onMouseOut.bind(this,htmlImages.origin));
    konvaAnimal.on('dragmove', this.onDragMove.bind(this));
  }

  onDragStart () {
    this.konvaAnimal.moveToTop();
  }

  onDragEnd () {
       
    if (!this.isNearOutline(this.konvaAnimal, this.konvaAnimalDrop)) {
      return
    }
    this.konvaAnimal.position({
        x:  this.konvaAnimalDrop.x(),
        y:  this.konvaAnimalDrop.y(),
      });
    

      // if (++score >= 4) {
      //   alert('You win! Enjoy your booty!');
      // }

      // disable drag and drop
      setTimeout(()=>{
        this.konvaAnimal.draggable(false);
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
    CursorManager.setPointCursor();
  }
  

  isNearOutline(animal: Image, animalDropImage: Image):boolean {
    const a: Image = animal;
    const o: Image = animalDropImage;
    const ax: number = a.x();
    const ay: number = a.y();

    return ax > o.x() - 20 && ax < o.x() + 20 && ay > o.y() - 20 && ay < o.y() + 20
    
  }
}