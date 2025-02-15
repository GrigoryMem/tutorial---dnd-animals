import { Howl } from "howler";
import AnimalEventObserver, { EAnimalEvents } from "../types/AnimalEventObserver";

type ISound = {
  [trackName: string]: Howl
}
// для работы со звуком
export default class AudioService implements AnimalEventObserver{
  // создать объект звуков
  private sounds: ISound = {};

  constructor(private readonly folder: string){}
  load(trackName: string, fileName: string):void  {
    // получаем путь к файлу
    const src: string = this.folder + fileName;
    // собираем в объекте все наши треки
    this.sounds[trackName] = new Howl({src});

  }

  play(trackName: string, volume?: number):void {
    // если трека нет ничего не возвращаем
    if(!this.sounds[trackName]) return
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
        this.play('pop-down')
        
    } else if (eventType === EAnimalEvents.DRAG_START) {
      // если начали тащить
      this.play('pop-up-on')
    }
  }

}