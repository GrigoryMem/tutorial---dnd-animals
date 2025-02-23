import confetti, {Options} from 'canvas-confetti';

// import other necessary modules or classes here
import { randomInterval } from '../helpers/randominterval';

export default class ConfettiService {
    protected readonly options: Options //Опции конфетти
    // идентификатор тайминга как часть conffeti service
    // private timerId: number = 0; // Таймер для интервала анимации
    protected timerId: ReturnType<typeof setInterval> | 0 = 0;
    constructor(options: Partial<Options>){ 
      //принимает объект, где все свойства Options необязательны.
        const  defaultOptions:Partial<Options> ={
          startVelocity: 30, // сила разлета с каждого взрыва
          spread: 360, // разлет в круговую из одной точки из середины - окружность
          ticks: 100,  // время жизней
          zIndex: 0,
          particleCount: 100, // количество которое разлетается/ генерируется
          decay: 0.9, // как быстро они теряют скорость
        } 
        // объединяет дефолтные и пользовательские параметры (если переданы).
        this.options = {...defaultOptions, ...options}
    }
  start(seconds:number = 120): void {  //запуск анимации
    // время анимации (по умолчанию 120 секунд).
    const duration:number  = seconds * 1000;
    // фиксируем момент, когда анимация должна закончиться.
    let animationEnd:number= Date.now() + duration;  // анимация закончена
    // Запуск интервала
    this.timerId = setInterval(()=> {
      // сколько времени прошло у нас
      // Проверка времени анимации 
      const timeLeft: number  = animationEnd - Date.now();
      // Если время истекло (timeLeft <= 0), 
      // останавливаем конфетти с помощью this.stop().
      if (timeLeft <= 0) {
        return this.stop()
      }
      // Настройка количества частиц
      const particleCount = 50 * (timeLeft / duration);
      // Чем меньше времени осталось, тем меньше частиц создается.
      // since particles fall down, start a bit higher than random
      // создаем новый набор опциональных параметров  для работы конфетти this.options
      // Запуск конфетти из двух случайных точек
      // origin.x — случайное значение между 0.1 и 0.3 (левая сторона экрана) и 0.7 и 0.9 (правая сторона).
      confetti({ ...this.options, particleCount, origin: { x: randomInterval(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...this.options, particleCount, origin: { x: randomInterval(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  }
  stop(): void {
    clearInterval(this.timerId)
  }
}