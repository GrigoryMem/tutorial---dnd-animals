import './style.css';
import { dataAnimals, dataBackground, soundsData } from './sources';
import ImageLoaderService from './services/imageLoaderService';
import GameBuilder from './core/GameBuilder';
import AudioService from './services/AudioService';

const audioService = new AudioService('/sound/')

const gameBuilder:GameBuilder = new GameBuilder(
  new ImageLoaderService(),
  audioService, 
  dataAnimals);

const game = await  gameBuilder
  .loadSounds(soundsData)
  .loadBackground(dataBackground)
  .loadImageAnimals()
  .build()



document.querySelector('#restart')?.addEventListener('click',(): void=>{
  game.restart()
})

// Выключение/включение звука 
// ?????
document.querySelector('#mute')?.addEventListener('click', (e): void=>{
  const isMute = audioService.toggleSound()
  const button:HTMLButtonElement = e.target as HTMLButtonElement; //?
  button.textContent = `Sound ${isMute ? 'Off' : 'On'}`;
})


game.start()

game.onEndGame(()=>{
  setTimeout(()=>{
    alert('You win! Enjoy the game!')
  },0)
})


  


  

    

    


      
   
