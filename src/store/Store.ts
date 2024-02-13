export class Store {
  constructor() { }
  
  set(key: string, value: object) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
}
