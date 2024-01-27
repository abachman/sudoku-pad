interface CustomEventMap {
  "select": Select | ShiftSelect;
}
declare global {
  // adds definition to Document, but you can do the same with HTMLElement
  interface Document { 
    addEventListener<K extends keyof CustomEventMap>(
      type: K,
      listener: (this: Document, ev: CustomEventMap[K]) => void,
    ): void;
    dispatchEvent<K extends keyof CustomEventMap>(ev: CustomEventMap[K]): void;
  }
}
export {};
