export default class ImageLoaderService {
  load(fileName:string,width:number, height:number):Promise<HTMLImageElement>{
      return new Promise((resolve,reject):void=>{
        let img:HTMLImageElement = new Image();
        img.width = width;
        img.height = height;
        // если рисунок загрузится, возвращаем сам экземпляр рисунка
        img.onload =()=> resolve(img);
        img.onerror = ()=>reject(new Error(`Failed to load image: ${fileName}`));
        img.src= fileName;
      })
  }
}