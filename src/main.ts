import { SVG } from "@svgdotjs/svg.js";
import { Cell } from "./grid/cell.js";
import { Block } from "./grid/block.js";
import { Grid } from "./grid/grid.js";
import { Button } from "./grid/button";
import { DIRS } from "./util/direction.js";
import mousetrap from "mousetrap";

import "./style.css";
// calculate geometry
const width = 680;
const height = 500;
const side = 32;

// top left corner of grid
const ox = (width - side * 9) / 2;
const oy = (height - side * 9) / 2;

const cells: Cell[] = [];
const blocks: Block[] = [];

const grid = new Grid();

let bn = 1;

for (let band = 0; band < 3; band++) {
  // bands
  for (let stack = 0; stack < 3; stack++) {
    // stacks
    const rx = ox + stack * side * 3;
    const ry = oy + band * side * 3;

    const block = new Block({
      coords: [rx, ry, side * 3],
      n: bn++,
    });
    blocks.push(block);

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const cx = rx + c * side;
        const cy = ry + r * side;
        const cell = new Cell({
          coords: [cx, cy, side],
          x: 1 + c + stack * 3,
          y: 1 + r + band * 3,
          bx: c,
          by: r,
          block,
          grid,
        });
        cells.push(cell);
      }
    }
  }
}

// Create SVG and set viewbox
// so that we zoom into the center
const canvas = SVG();
canvas.addTo("#app").size(width, height);

// grid
for (const cell of cells) {
  cell.draw(canvas);
}

// blocks
for (const block of blocks) {
  block.draw(canvas);
}

// indicators
const pencil = new Button({
  svg: canvas,
  symbol: Button.PENCIL,
  coords: [ox, oy + side * 9 + 8, 32],
});

// global keyboard event handlers
mousetrap.bind("esc", () => {
  grid.clearSelection();
});

for (const [dir, code] of Object.entries(DIRS)) {
  mousetrap.bind(dir, () => {
    grid.moveFocus(code as DIR);
  });

  mousetrap.bind(`shift+${dir}`, () => {
    grid.moveFocus(code as DIR, { shift: true });
  });
}

const nums = Array.from({ length: 10 }, (_, i) => i.toString());
for (const num of nums) {
  mousetrap.bind(num, () => {
    const focused = grid.state.focused;
    if (focused) {
      focused.set(parseInt(num));
    }
  });
}

// d for delete
mousetrap.bind("d", () => {
  const focused = grid.state.focused;
  if (focused) {
    focused.clear();
  }
});

// p for pencil mode
const togglePencil = () => {
  grid.state.pencil = !grid.state.pencil;
  pencil.toggle(grid.state.pencil);
}

mousetrap.bind("p", togglePencil) 
pencil.click(togglePencil) 
