import { AnimalsData } from "./types/data";

const dataBackground:{src: string, width: number, height: number} = {
  src: 'forest.png',
  width: 578,
  height: 530
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
      x:105,
      y:82,
    }
  },
 lizard:{
  src:'lizard.png',
  x:0,
  y:0,
  glow:'lizard-glow.png',
  width:90,
  height:100,
  drop:{
    src:'lizard-drop.png',
    x:100,
    y:100,
  }
 },
 dragonfly:{
  src:"dragonfly.png",
  x:0,
  y:0,
  glow:"dragonfly-glow.png",
  width:100,
  height:100,
  drop:{
    src:"dragonfly-drop.png",
    x:90,
    y:90,
  }
 }
}


export {dataBackground, dataAnimals}