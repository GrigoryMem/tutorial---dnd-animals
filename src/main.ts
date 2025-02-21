import './style.css';
import { dataAnimals, dataBackground, soundsData } from './sources';
import ImageLoaderService from './services/imageLoaderService';
import GameBuilder from './core/GameBuilder';
import AudioService from './services/AudioService';
import ConfettiService from './services/ConfettiService';
const BASE_URL:string = import.meta.env.BASE_URL; 

const audioService = new AudioService(`${BASE_URL}/sound/`)

const gameBuilder:GameBuilder = new GameBuilder(
  new ImageLoaderService(),
  audioService, 
  dataAnimals);

;(async ()=>{
  const game = await  gameBuilder
  .loadSounds(soundsData)
  .loadBackground(dataBackground)
  .loadImageAnimals()
  .build()


  game.start()
  document.querySelector('#restart')?.addEventListener('click',(): void=>{
  game.restart()
  })


// Выключение/включение звука 
// ?????
  document.querySelector('#mute')?.addEventListener('click', (e: Event): void=>{
    const isMute = audioService.toggleSound()
    const button:HTMLButtonElement = e.target as HTMLButtonElement; //?
    button.textContent = `Sound ${isMute ? 'Off' : 'On'}`;
  })

  const confettiService: ConfettiService = new ConfettiService({});



  game.onEndGame(()=>{
    // Создаем экземпляр ConfettiService, передаем настройки.
  // Запускаем конфетти на 10 секунд.
  // Через 5 секунд вручную останавливаем.
    confettiService.start(5);
    setTimeout(()=>{
      alert('You win! Enjoy the game!')
    },0)
  })

})()



  


  

    

    


      
   
