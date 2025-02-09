import Game from './Game';
import ImageLoaderService from '../services/imageLoaderService';
import { AnimalPromiseImages } from '../types/image';
import { AnimalsData, AnimalsWithImages, ImageData } from '../types/data';
import KonvaFactory from '../factories/konvaFactory';

export default class GameBuilder {
  private backgroundImage: Promise<HTMLImageElement> | null = null; 
  // объект для сохраненных промисов с рисунками
  private animalImages:AnimalPromiseImages  = {}
  constructor(
    private readonly imageLoaderService: ImageLoaderService,
    private readonly dataAnimals: AnimalsData
    
  ) {

  }
  
  loadBackground(dataBackground: ImageData): GameBuilder {
    this.backgroundImage =  this.imageLoaderService.load(
      dataBackground.src,
      dataBackground.width,
      dataBackground.height
      )
      return this
  }
  loadImageAnimals(): GameBuilder {
   
    for(const animalName in this.dataAnimals) {
      // на каждой итерации берем объект каждого животного
      const animal = this.dataAnimals[animalName];
      // набор  животных с загруженными ими рисунками
      // формируем набор загруженных рисунков - промисы загрузки
      this.animalImages[animalName] = {
        origin:  this.imageLoaderService.load(animal.src,animal.width,animal.height),
        glow:  this.imageLoaderService.load(animal.glow,animal.width,animal.height),
        drop:  this.imageLoaderService.load(animal.drop.src,animal.width,animal.height),
      }
    } 
    return this
  }
  async build():Promise<Game> {
    const backgroundImage:HTMLImageElement = this.backgroundImage !==null ? await this.backgroundImage : new Image();
    const animalsWithImages:AnimalsWithImages = {}
    // пробежимся по промисам, которые мы сохранили:
    for(const animalName in this.animalImages){
      const animalImage = this.animalImages[animalName];
      const [origin, glow,drop] = await Promise.all(
        [animalImage.origin,
           animalImage.glow, 
           animalImage.drop
        ] as const);
        // вернем данные каждого животного и уже загруж 
        //картинки по имени кажд животоного
      animalsWithImages[animalName] = {
        ...this.dataAnimals[animalName],
        images:{
          origin,
          glow,
          drop
        }
      }

    }
    // let sources = {
    //   beach: backgroundImage,
    //   lion: await this.animalImages['ant'].origin,
    //   lion_glow: await this.animalImages['ant'].glow,
    //   lion_black: await this.animalImages['ant'].drop,
    // }
    const konvaFactory: KonvaFactory = new KonvaFactory(backgroundImage.width, backgroundImage.height);

  return new Game(konvaFactory, animalsWithImages, backgroundImage);
  
}

}