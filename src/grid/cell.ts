import { Square } from "./square";
import type { Block } from "./block";
import type { Grid } from "./grid";
import { CellEmitter, Select } from "./cell/events";
import SVG from "@svgdotjs/svg.js";

type CellOptions = {
  coords: Coords;
  x: number;
  y: number;
  bx: number;
  by: number;
  block: Block;
  grid: Grid;
};

type CellState = {
  selected: boolean;
  pencil: number[];
  value: number | null;
};

class Cell extends Square {
  x: number;
  y: number;
  bx: number;
  by: number;
  block: Block;
  grid: Grid;
  key: GridKey;
  state: CellState = {
    selected: false,
    pencil: [],
    value: null,
  };
  target: CellEmitter = new CellEmitter();

  constructor({ coords, x, y, bx, by, block, grid }: CellOptions) {
    super({ coords });

    this.x = x;
    this.y = y;
    this.key = `${this.x}${this.y}`;
    this.bx = bx;
    this.by = by;
    this.block = block;
    this.grid = grid;
    this.grid.add(this);

    this.element = null;

    this.target.addEventListener("select", this.onSelect.bind(this));
  }

  onMouseover(evt: Event) {
    const mevt = evt as MouseEvent;
    if (this.element) {
      if (!this.state.selected) {
        this.element.attr({ fill: "#6ac" });
      }
      if (mevt.shiftKey && mevt.buttons === 1) {
        this.state.selected = true;
        this.grid.dispatch(
          new CustomEvent("select", {
            detail: { shiftKey: mevt.shiftKey, key: this.key },
          }),
        );
      }
    }
  }

  onMouseout(_evt: Event) {
    if (this.element && !this.state.selected) {
      this.element.attr({ fill: "#fff" });
    }
  }

  onClick(evt: Event) {
    const mevt = evt as MouseEvent;
    if (this.element) {
      console.log("click", this.x, this.y);
      this.state.selected = !this.state.selected;

      this.grid.dispatch(
        new CustomEvent("select", {
          detail: { shiftKey: mevt.shiftKey, key: this.key },
        }),
      );
    }
  }

  onSelect(evt: Select) {
    if (evt.detail.shiftKey && this.state.selected) {
      // do nothing, another cell is being selected
    } else if (this.state.selected && evt.detail.key !== this.key) {
      this.state.selected = false;
    }
  }

  refresh() {
    if (this.element) {
      if (this.state.selected) {
        this.element.attr({ fill: "#09a" });
      } else {
        this.element.attr({ fill: "#fff" });
      }
    }
  }

  draw(canvas: SVG.Svg) {
    this.element = this.trace(canvas);
    this.label(`${this.x},${this.y}`);

    this.element.on("mouseover", this.onMouseover.bind(this));
    this.element.on("mouseout", this.onMouseout.bind(this));
    this.element.on("click", this.onClick.bind(this));
  }
}

export { Cell };
