import SVG from "@svgdotjs/svg.js";
import { autorun } from "mobx";

import type { Block } from "./Block";
import type { Grid } from "./Grid";
import { CellEmitter, /* Select */ } from "./cell/events";
import { CellState } from "./cell/CellState";
import { Square } from "./Square";

type CellOptions = {
  coords: Coords;
  x: number;
  y: number;
  bx: number;
  by: number;
  block: Block;
  grid: Grid;
  svg: SVG.Svg
  state?: Partial<CellState>;
};

class Cell extends Square {
  x: number;
  y: number;
  bx: number;
  by: number;
  block: Block;
  grid: Grid;
  key: GridKey;
  target: CellEmitter = new CellEmitter();
  private state: CellState;

  constructor({ coords, x, y, bx, by, block, grid, state, svg }: CellOptions) {
    super({ coords, svg });

    this.x = x;
    this.y = y;
    this.key = `${this.x}${this.y}`;
    this.bx = bx;
    this.by = by;
    this.block = block;
    this.grid = grid;
    this.grid.add(this);
    this.state = new CellState(state);

    this.element = null;

    // this.target.addEventListener("select", this.onSelect.bind(this));
    // this.target.addEventListener("set", this.onSet.bind(this));
  }

  select() {
    this.state.select();
  }

  deselect() {
    this.state.deselect();
  }

  focus() {
    this.state.focus()
  }

  unfocus() {
    this.state.unfocus()
  }

  // hover on
  onMouseover(_evt: Event) {
    this.focus()
  }

  // hover off
  onMouseout(_evt: Event) {
    this.unfocus()
  }

  render() {
    this.element = this.trace();

    this.element.on("mouseover", this.onMouseover.bind(this));
    this.element.on("mouseout", this.onMouseout.bind(this));
    // this.element.on("click", this.onClick.bind(this));

    // bind all rendering to live data update events
    autorun(() => {
      // if (this.state.selected) {
      //   this.element?.attr({ fill: "#09a" });
      // } else {
      //   this.element?.attr({ fill: "#fff" });
      // }
      if (this.state.focused) {
        this.decorate()
      } else {
        this.undecorate()
      }

      if (this.state.value) {
        this.label(this.state.value.toString(), {
          fill: this.state.fixed ? "#015" : "#000",
          bold: true,
        });

        if (this.state.fixed) {
          this.element?.fill("#eef");
        }
      } else {
        this.unlabel();
      }

      if (this.state.pencil.length > 0) {
        this.pencil(this.state.pencil);
      } else {
        this.unpencil();
      }
    });
  }

  set(value: number, options: { pencil?: boolean } = {}) {
    if (options.pencil) {
      this.state.resetValue();
      console.log('set', this.key, 'pencil', value)
      this.state.updatePencil(value);
    } else {
      this.state.resetPencil();
      this.state.updateValue(value);
    }
  }

  clear() {
    if (this.state.fixed) return;

    this.state.reset();
  }

  toJSON() {
    return this.state.toJSON();
  }

  selected() {
    return this.state.selected;
  }
}

export { Cell };
