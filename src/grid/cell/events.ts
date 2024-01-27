export type Select = CustomEvent<{ 
  shiftKey: boolean 
  key: GridKey
}> & { type: "select" };

interface CellEventMap {
  "select": Select;
}

interface CellEventTarget extends EventTarget {
  addEventListener<K extends keyof CellEventMap>(
    type: K,
    listener: (ev: CellEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions,
  ): void;
  addEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject | null,
    options?: EventListenerOptions | boolean,
  ): void;
}

const TypedEventTarget = EventTarget as {
  new (): CellEventTarget;
  prototype: CellEventTarget;
};

export class CellEmitter extends TypedEventTarget {
}

