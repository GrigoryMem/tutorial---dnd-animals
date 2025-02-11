// Этот класс CanvasSizeService предназначен для 
//вычисления размеров и масштаба фонового изображения так,
//чтобы оно корректно вписывалось в окно браузера без искажений.
//Вычисляет, как правильно вписать фон в окно, сохраняя пропорции,
 //чтобы не было растяжений.
export default class CanvasSizeService {
  private readonly width: number;
  private readonly height: number;
  private readonly scale: number;
  constructor(
    //размеры окнра браузера
     windowWidth: number,
     windowHeight: number,
     // размеры фонового изображения
     backgroundWidth: number,
     backgroundHeight: number
  ) { 
    // Шаг 1. Вычисляем соотношения сторон (aspect ratio)
    // Соотношение сторон (aspect ratio) — это ширина, делённая 
    // на высоту. Оно показывает,
    //  насколько изображение "растянуто" в ту или иную сторону.
    // соотношение сторон фонового изображения.
    const imageAspect: number = backgroundWidth/backgroundHeight;
    //соотношение сторон окна браузера.
    const  windowAspect: number = windowWidth/windowHeight;
    // для размера нового изображенич
    let newWidth:number = 0,
        newHeight:number = 0;
        // В зависимости от того, шире ли изображение, чем окно, или выше, 
        //чем окно, мы применяем разные стратегии подгонки.
        // Шаг 3. Выбираем стратегию подгонки:
        // Если изображение более широкое, чем окно 
        // (например, 16:9 против 4:3), то  
    if(imageAspect > windowAspect) {
      // размер всего экрана - всей области
      // Подгоняем по ширине (ширина = ширина окна).
      newWidth =windowWidth
      // Высоту рассчитываем так, чтобы сохранить пропорции.
      newHeight = newWidth / imageAspect;
    } else {
      // если изображение выше чем экран, выравниваем по высоте
      // Если изображение более узкое и высокое, то:
      // Подгоняем по высоте (высота = высота окна).
      newHeight = windowHeight;
      // Ширину вычисляем так, чтобы сохранить пропорции.
      newWidth = newHeight * imageAspect;
    }

    this.width = newWidth;
    this.height = newHeight;
    // – коэффициент, показывающий, во сколько 
    // раз изменился размер по сравнению с оригиналом.
    this.scale =newWidth / backgroundWidth
  }

  getWidth(): number {
    return this.width;
  }
  getHeight(): number {
    return this.height;
  }

  getScale(): number {
    return this.scale;
  }
}