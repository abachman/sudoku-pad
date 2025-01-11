import { makeAutoObservable } from "mobx"

export class CellState {
  selected: boolean = false
  focused: boolean = false
  pencil: number[] = []
  value: number | null = null
  fixed: boolean = false

  constructor(initial: Partial<CellState> = {}) {
    Object.assign(this, initial)
    makeAutoObservable(this)
  }

  updateValue(value: number) {
    if (this.fixed) return

    this.value = value
  }

  resetValue() {
    if (this.fixed) return

    this.value = null
  }

  updatePencil(value: number) {
    if (this.pencil.includes(value)) {
      this.pencil = this.pencil.filter((n) => n !== value)
    } else {
      this.pencil.push(value)
    }
  }

  resetPencil() {
    this.pencil = []
  }

  reset() {
    if (this.fixed) return

    this.resetValue()
    this.resetPencil()
  }

  select() {
    this.selected = true
  }
  deselect() {
    this.selected = false
  }

  focus() {
    this.focused = true
  }
  unfocus() {
    this.focused = false
  }

  toJSON() {
    return {
      selected: this.selected,
      pencil: this.pencil,
      value: this.value,
    }
  }
}
