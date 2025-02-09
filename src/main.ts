import './style.css';
import { dataAnimals, dataBackground } from './sources';
import ImageLoaderService from './services/imageLoaderService';
import GameBuilder from './core/GameBuilder';

const gameBuilder:GameBuilder = new GameBuilder(new ImageLoaderService(),dataAnimals);
const game = await  gameBuilder
  .loadBackground(dataBackground)
  .loadImageAnimals()
  .build()




  


  

    

    


      
   
