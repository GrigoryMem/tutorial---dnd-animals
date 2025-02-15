import { AnimalsData } from "./types/data";

const dataBackground:{src: string, width: number, height: number} = {
  src: 'forest.png',
  width: 578,
  height: 530
}

const soundsData = {
  'pop-up-on':'liagushka.mp3',
  'pop-up-off':'mouses.mp3',
  'pop-down':'guse.mp3',
   win:'horse.mp3'
}

const dataAnimals:AnimalsData = {
  ant:{
    src:'Ant.png',
    x:50,
    y:50,
    glow:'Ant-glow.png',
    width:68,
    height:130,
    drop:{
      src:'Ant-drop.png',
      x:120,
      y:82,
    }
  },
 lizard:{
  src:'lizard.png',
  x:50,
  y:50,
  glow:'lizard-glow.png',
  width:155,
  height:185,
  drop:{
    src:'lizard-drop.png',
    x:320,
    y:105,
  }
 },
 dragonfly:{
  src:"dragonfly.png",
  x:20,
  y:20,
  glow:"dragonfly-glow.png",
  width:100,
  height:140,
  drop:{
    src:"dragonfly-drop.png",
    x:205,
    y:6,
  }
 }
}


export {dataBackground, dataAnimals,soundsData}