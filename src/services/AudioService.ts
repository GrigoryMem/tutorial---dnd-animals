import { Howl } from "howler";
import AnimalEventObserver, { EAnimalEvents } from "../types/AnimalEventObserver";

type ISound = {
  [trackName: string]: Howl
}
// для работы со звуком
export default class AudioService implements AnimalEventObserver{
  // создать объект звуков
  private sounds: ISound = {};
  private isMute: boolean = false;


  constructor(private readonly folder: string){}

  toggleSound(): boolean {
    // инвертирование значения:
    this.isMute = !this.isMute

    return this.isMute
  }

  load(trackName: string, fileName: string):void  {
    // получаем путь к файлу
    const src: string = this.folder + fileName;
    // собираем в объекте все наши треки
    this.sounds[trackName] = new Howl({src});

  }

  play(trackName: string, volume?: number):void {
    // если трека нет ничего не возвращаем
    if(!this.sounds[trackName] || this.isMute) return
    // если передан звук
    if(volume) {
      //  передаем в howl метод volume значение громкости volume - метод громкости
      this.sounds[trackName].volume(volume);
    }
    // воспроизводим трек
    this.sounds[trackName].play();
  }

  update(eventType: EAnimalEvents, data?:any): void {
    if(eventType === EAnimalEvents.DRAG_END && data?.success) {
      // если закончили тащить успешно
      this.play('pop-up-off');
    } else if(eventType === EAnimalEvents.DRAG_END && 
      data?.success ===false) {
        // если закончили тащить неудачно
        this.play('pop-down',0.1)
        
    } else if (eventType === EAnimalEvents.DRAG_START) {
      // если начали тащить
      this.play('pop-up-on',0.3)
    }
  }

  playWin(): void {
    this.play('win',0.1);
  }

}