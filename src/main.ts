import type { Grid } from "./grid/Grid";
import { init } from "./grid/init";
import "./style.css";

declare global {
  interface Window {
    grid: Grid;
  }
}

const grid = init({ dom: "#app" });
window.grid = grid;



// // indicators
// const pencil = new Button({
//   svg: canvas,
//   symbol: Button.PENCIL,
//   coords: [ox, oy + side * 9 + 8, side],
// });

// // p for pencil mode
// const togglePencil = () => {
//   grid.state.pencil = !grid.state.pencil;
//   pencil.toggle(grid.state.pencil);
// };

// mousetrap.bind("p", togglePencil);
// pencil.click(togglePencil);
