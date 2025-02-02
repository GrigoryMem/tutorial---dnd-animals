import Game from './Game';
import ImageLoaderService from '../services/imageLoaderService';
import { AnimalPromiseImages } from '../types/image';
import { AnimalsData, ImageData } from '../types/data';


export default class GameBuilder {
  private backgroundImage: Promise<HTMLImageElement> | null = null; 
  private animalImages:AnimalPromiseImages  = {}
  constructor(
    private readonly imageLoaderService: ImageLoaderService
    
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
  loadImageAnimals(dataAnimals: AnimalsData): GameBuilder {
   
    for(const animalName in dataAnimals) {
      // на каждой итерации берем объект каждого животного
      const animal = dataAnimals[animalName];
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
    let sources = {
      beach: backgroundImage,
      lion: await this.animalImages['ant'].origin,
      lion_glow: await this.animalImages['ant'].glow,
      lion_black: await this.animalImages['ant'].drop,
    }

  return new Game(sources)
  
}

}