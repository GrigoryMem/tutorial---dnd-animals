import './style.css';
import { dataAnimals, dataBackground } from './sources';
import ImageLoaderService from './services/imageLoaderService';
import GameBuilder from './core/GameBuilder';

const gameBuilder:GameBuilder = new GameBuilder(new ImageLoaderService());
const game = await  gameBuilder
  .loadBackground(dataBackground)
  .loadImageAnimals(dataAnimals)
  .build()




  


  

    

    


      
   
