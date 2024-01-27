import type { Cell } from "./cell";
import type { Select } from "./cell/events";

class Grid {
  cells: GridSearch = {};

  constructor() {
  }

  add(cell: Cell) {
    this.cells[cell.key] = cell;
  }

  dispatch(event: Event | Select) {
    console.log("dispatch", event, 'to', this.cells);
    for (const cell of Object.values(this.cells)) {
      cell.target.dispatchEvent(event);
    }

    for (const cell of Object.values(this.cells)) {
      cell.refresh()
    }
  }
}

export { Grid }
