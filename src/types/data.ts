// типизация тени животного
type DropData = {
  src:string,
  x:number,
  y:number
}

// типизация одного животного
type AnimalData = {
  src:string,
  x:number,
  y:number,
  glow:string,
  width:number,
  height:number,
  drop:DropData
}

// типизация набора животных
export type AnimalsData = {
  [key: string]: Readonly<AnimalData>
}