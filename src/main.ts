import { SVG } from "@svgdotjs/svg.js";
import { Cell } from "./grid/Cell";
import type { CellState } from "./grid/cell/CellState";
import { Block } from "./grid/Block";
import { Grid } from "./grid/Grid";
import { Button } from "./grid/Button";
import { DIRS } from "./util/direction";
import { Store } from "./store/Store";
import { autorun } from "mobx";
import mousetrap from "mousetrap";

import "./style.css";

import one from "../puzzles/one.json"

const fixedBoard: Record<GridKey, Partial<CellState>> = {}
let r = 0;
let c = 0;
for (const value of one.board.split('')) {
  if (value !== '0') {
    fixedBoard[`${c+1}${r+1}`] = {
      value: parseInt(value),
      fixed: true
    }
  }

  c += 1
  if (c === 9) {
    c = 0
    r += 1
  }
}

const store = new Store();

// calculate geometry
const width = window.innerWidth;
const height = window.innerHeight - 8;
const side = 48;

// top left corner of grid
const ox = (width - side * 9) / 2;
const oy = (height - side * 9) / 2;

const cells: Cell[] = [];
const blocks: Block[] = [];

const grid = new Grid();

let bn = 1;

// Create global SVG object
const canvas = SVG();
canvas.addTo("#app").size(width, height);

for (let band = 0; band < 3; band++) {
  // bands
  for (let stack = 0; stack < 3; stack++) {
    // stacks
    const rx = ox + stack * side * 3;
    const ry = oy + band * side * 3;

    const block = new Block({
      coords: [rx, ry, side * 3],
      n: bn++,
      svg: canvas
    });
    blocks.push(block);

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        // pixel based coordinates
        const cx = rx + c * side;
        const cy = ry + r * side;
        // human readable, 1-based coordinates
        const x = 1 + c + stack * 3;
        const y = 1 + r + band * 3;
        const key: GridKey = `${x}${y}`;
        const state = store.get(key) as Partial<CellState>;
        const cell = new Cell({
          coords: [cx, cy, side],
          x,
          y,
          bx: c,
          by: r,
          block,
          grid,
          state: Object.assign({}, state, fixedBoard[key]),
          svg: canvas
        });
        cells.push(cell);
      }
    }
  }
}


// grid
for (const cell of cells) {
  cell.render();
}

// blocks
for (const block of blocks) {
  block.render();
}

// indicators
const pencil = new Button({
  svg: canvas,
  symbol: Button.PENCIL,
  coords: [ox, oy + side * 9 + 8, side],
});

const download = new Button({
  svg: canvas,
  symbol: Button.DOWNLOAD,
  coords: [ox + side * 8, oy + side * 9 + 8, side]
})

const checkpoint = new Button({
  svg: canvas,
  symbol: Button.PLUS,
  coords: [ox + side * 7, oy + side * 9 + 8, side]
})

// global keyboard event handlers
mousetrap.bind("esc", () => {
  grid.clearSelection();
});

// arrow keys move focus
for (const [dir, code] of Object.entries(DIRS)) {
  mousetrap.bind(dir, () => {
    grid.moveFocus(code as DIR);
  });

  // mousetrap.bind(`shift+${dir}`, () => {
  //   grid.moveFocus(code as DIR, { shift: true });
  // });
}

mousetrap.bind("s", () => {
  grid.selectFocused();
})

// 1-9 for setting values
const nums = Array.from({ length: 10 }, (_, i) => i.toString());
for (const num of nums) {
  if (num === "0") continue;

  mousetrap.bind(num, () => {
    grid.set(parseInt(num));
  });
}

// d for delete
mousetrap.bind("d", () => {
  grid.state.focused?.clear();
});

// p for pencil mode
const togglePencil = () => {
  grid.state.pencil = !grid.state.pencil;
  pencil.toggle(grid.state.pencil);
};

mousetrap.bind("p", togglePencil);
pencil.click(togglePencil);

download.click(() => {
  console.log(JSON.stringify(grid.toJSON()))
})

checkpoint.click(() => {
  console.log(JSON.stringify(grid.toJSON()))
})

// FIXME: this is too much
let firstRun = true;
autorun(() => {
  console.log('autorun cell-monitor');
  for (const cell of cells) {
    store.set(cell.key, cell.toJSON())
  }
  firstRun = false;
});
