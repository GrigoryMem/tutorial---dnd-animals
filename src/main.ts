import './style.css';
import Konva from 'konva';
import { dataAnimals, dataBackground } from './sources';
import ImageLoaderService from './services/imageLoaderService';
import { AnimalImages } from './types/image';
import Game from './core/Game';




const imageLoaderService:ImageLoaderService = new ImageLoaderService();
// подождем загрузки  и получим сам элемент  картинки
const backgroundImage: Promise<HTMLImageElement> = await imageLoaderService.load(
  dataBackground.src,
  dataBackground.width,
  dataBackground.height
  )
console.log(backgroundImage);
// сам build будет всегда возрвращать экземпляр класса game
  // загрузка рисунков животных

  const animalImages:AnimalImages = {};
  for(const nameAnimal in dataAnimals) {
    // на каждой итерации берем объект каждого животного
    const animal = dataAnimals[nameAnimal];
    // набор  животных с загруженными ими рисунками
    // формируем набор загруженных рисунков
    animalImages[nameAnimal] = {
      origin: await imageLoaderService.load(animal.src,animal.width,animal.height),
      glow: await imageLoaderService.load(animal.glow,animal.width,animal.height),
      drop: await imageLoaderService.load(animal.drop.src,animal.width,animal.height),
    }
  }


  var sources = {
    beach: backgroundImage,
    // snake: 'snake.png',
    // snake_glow: 'snake-glow.png',
    // snake_black: 'snake-black.png',
    lion: animalImages['ant'].origin,
    lion_glow: animalImages['ant'].glow,
    lion_black: animalImages['ant'].drop,
    // monkey: 'monkey.png',
    // monkey_glow: 'monkey-glow.png',
    // monkey_black: 'monkey-black.png',
    // giraffe: 'giraffe.png',
    // giraffe_glow: 'giraffe-glow.png',
    // giraffe_black: 'giraffe-black.png',
  };
 
new Game(sources);
    

    


      
   
