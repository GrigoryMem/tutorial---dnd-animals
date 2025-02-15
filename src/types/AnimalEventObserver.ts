export enum EAnimalEvents {
  DRAG_START ='dragstart',
  DRAG_END = 'dragend'
}
// наблюдатель типа Observer
export default interface AnimalEventObserver {
  update(eventType: EAnimalEvents, data?:any):void 
}

// объект наблюдения за событиями животных
export interface AnimalEventSubject {
  subscribe(observer:AnimalEventObserver):void
  unsubscribe(observer:AnimalEventObserver):void
  notifyObservers(eventType: string, data?: any): void
} 