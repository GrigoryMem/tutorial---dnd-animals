export enum EAnimalEvents {
  DRAG_START ='dragstart',
  DRAG_END = 'dragend'
}

// Когда событие DRAG_END срабатывает, оно не говорит, правильно ли игрок разместил животное.
//  Это просто факт: "пользователь отпустил объект".
// наблюдатель типа Observer
export default interface AnimalEventObserver {
  update(eventType: string, data?:any):void 
}

// объект наблюдения за событиями животных
export interface AnimalEventSubject {
  subscribe(observer:AnimalEventObserver):void
  unsubscribe(observer:AnimalEventObserver):void
  notifyObservers(eventType: string, data?: any): void
} 