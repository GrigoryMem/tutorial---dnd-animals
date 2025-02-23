import confetti, {Options} from 'canvas-confetti';

// import other necessary modules or classes here
import { randomInterval } from '../helpers/randominterval';
import ConfettiService from './ConfettiService';
// Partial<Options> - опциональные свойства Options
export default class SnowService extends ConfettiService {
  
    constructor(options: Partial<Options>){ 
        super({
          particleCount: 1,
          startVelocity: 0,
          colors: ['#ffffff'], // белый цвет
          shapes: ['circle'], // круглой формы
          ...options,
        })
    }
  start(seconds:number = 120): void {  //запуск анимации
    // время анимации (по умолчанию 120 секунд).
    const duration:number  = seconds * 1000;
    // фиксируем момент, когда анимация должна закончиться.
    let animationEnd:number= Date.now() + duration;  // анимация закончена
    let skew:number = 1;

    const frame = ():void =>{
      let timeLeft = animationEnd - Date.now(); // сколько осталось времени
      let ticks = Math.max(200, 500 * (timeLeft / duration));// кадры
     
    
      confetti({
        ...this.options,
        ticks, // # of frames to create between now and animationEnd
        origin: { // рандомное местоположение
          x: Math.random(),
          // since particles fall down, skew start toward the top
          y: (Math.random() * skew) - 0.2
        },
        
        gravity: randomInterval(0.4, 0.6), // медленно парировать - рандомнаягравитация
        scalar: randomInterval(0.4, 1),
        drift: randomInterval(-0.4, 0.4)
      })

      if (timeLeft > 0) {
        requestAnimationFrame(frame);
      }
    }
    frame()
  }
}