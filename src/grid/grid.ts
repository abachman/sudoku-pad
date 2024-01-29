import type { Cell } from "./cell";
import type { Select } from "./cell/events";

type GridState = {
  focused?: Cell,
  pencil?: boolean,
}

class Grid {
  cells: GridSearch = {};
  state: GridState = {}

  constructor() { 
    this.indicators = [];
  }

  add(cell: Cell) {
    this.cells[cell.key] = cell;
  }

  dispatch(event: Event | Select) {
    console.log("dispatch", event, 'to', this.cells);
    for (const cell of Object.values(this.cells)) {
      cell.target.dispatchEvent(event);
    }

    this.refresh();
  }

  refresh() {
    for (const cell of Object.values(this.cells)) {
      cell.refresh()
    }

    this.state.focused!.focus()
  }

  clearSelection() {
    for (const cell of Object.values(this.cells)) {
      cell.state.selected = false;
    }
    this.refresh();
  }

  moveFocus(dir: DIR, options: { shift?: boolean } = {}) {
    const { focused } = this.state;
    if (!focused) {
      const cell = this.cell(1, 1);
      if (cell) this.setFocus(cell);
      return
    }

    const { x, y } = focused;
    const [nx, ny] = this.next(dir, x, y);
    const next = this.cell(nx, ny);
    if (next) {
      if (options.shift) {
        next.state.selected = true;
      }
      this.setFocus(next);
    } 

    this.refresh();
  }

  setFocus(next: Cell) {
    if (this.state.focused) {
      this.state.focused.clearFocus();
    }
    this.state.focused = next;
    next.focus();
  }

  private next(dir: DIR, x: number, y: number): [number, number] {
    switch (dir) {
      case 0: return [x, y - 1];
      case 1: return [x + 1, y];
      case 2: return [x, y + 1];
      case 3: return [x - 1, y];
    }
  }

  cell(x: number, y: number): Cell | undefined {
    const key: GridKey = `${x}${y}`;
    return this.cells[key];
  }
}

export { Grid }
