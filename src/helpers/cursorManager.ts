class CursorManager {
  constructor(
    private readonly element:HTMLElement,

  ){}
  setPointCursor():void {
    this.element.style.cursor = 'pointer';
  }
  setDefaultCursor():void {
    this.element.style.cursor = 'default';
  }
  setGrabbingCursor():void {
    this.element.style.cursor = 'grabbing';
  }
 
}


export default new CursorManager(document.getElementById('app') || document.body);