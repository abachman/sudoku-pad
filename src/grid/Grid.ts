import { makeObservable, action, observable } from 'mobx';
import type { Cell } from "./Cell";
import type { Block } from "./Block";

type GridState = {
  focused?: Cell;
  pencil?: boolean;
};

class Grid {
  blocks: Block[] = []
  cells: GridSearch = {};
  state: GridState = { focused: undefined, pencil: true };

  constructor() { 
    makeObservable(this, {
      state: observable,
      togglePencil: action,
      setState: action,
      setFocus: action,
    })
  }

  render() {
    // grid
    for (const cell of Object.values(this.cells)) {
      cell.render();
    }

    // blocks
    for (const block of this.blocks) {
      block.render();
    }
  }

  eachCell(cb: (c: Cell) => void) {
    Object.values(this.cells).forEach(cb)
  }

  setState(state: Partial<GridState>) {
    this.state = { ...this.state, ...state };
  }

  add(cell: Cell) {
    this.cells[cell.key] = cell;
  }

  selectFocused() {
    if (!this.state.focused) return;

    if (this.state.focused.selected()) {
      this.state.focused.deselect();
    } else {
      this.state.focused.select();
    }
  }

  clearSelection() {
    for (const cell of Object.values(this.cells)) {
      cell.deselect();
    }
  }

  moveFocus(dir: DIR) {
    const { focused } = this.state;
    if (!focused) {
      return this.setFocus(this.cell(1,1));
    }

    const { x, y } = focused;
    const [nx, ny] = this.next(dir, x, y);
    const next = this.cell(nx, ny);
    if (next) {
      this.setFocus(next);
    }
  }

  setFocus(next: Cell | undefined) {
    if (this.state.focused) {
      this.state.focused.unfocus();
    }
    this.state.focused = next;
    next?.focus();
  }

  private next(dir: DIR, x: number, y: number): [number, number] {
    switch (dir) {
      case 0:
        return [x, y - 1];
      case 1:
        return [x + 1, y];
      case 2:
        return [x, y + 1];
      case 3:
        return [x - 1, y];
    }
  }

  cell(x: number, y: number): Cell | undefined {
    const key: GridKey = `${x}${y}`;
    return this.cells[key];
  }

  set(value: number) {
    this.state.focused?.set(value, { pencil: this.state.pencil });

    // FIXME: focus should manage selected
    // for (const cell of Object.values(this.cells)) {
    //   if (cell.state.selected) {
    //     cell.set(value);
    //   }
    // }
  }

  toJSON() {
    return Object.
      entries(this.cells).
      map(([_key, cell]) => cell.toJSON())
  }

  togglePencil() {
    this.state.pencil = !this.state.pencil;
    return this.state.pencil;
  }
}

export { Grid };
