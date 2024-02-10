import { makeAutoObservable } from "mobx";

// state management example
export class Person {
  _name: string = '';
  _age: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  set name(name: string) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set age(age: number) {
    this._age = age;
  }

  get age() {
    return this._age;
  }
}
  
