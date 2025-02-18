import './style.css';
import { dataAnimals, dataBackground, soundsData } from './sources';
import ImageLoaderService from './services/imageLoaderService';
import GameBuilder from './core/GameBuilder';
import AudioService from './services/AudioService';

const gameBuilder:GameBuilder = new GameBuilder(
  new ImageLoaderService(),
  new AudioService('/sound/'), 
  dataAnimals);

const game = await  gameBuilder
  .loadSounds(soundsData)
  .loadBackground(dataBackground)
  .loadImageAnimals()
  .build()

game.start()
game.restart()
game.onEndGame(()=>{
  
})


  


  

    

    


      
   
