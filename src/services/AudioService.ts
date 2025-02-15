import { Howl } from "howler";

type ISound = {
  [trackName: string]: Howl
}
// для работы со звуком
export default class AudioService {
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

}