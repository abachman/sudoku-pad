import { SVG } from "@svgdotjs/svg.js"
import { Cell } from "./Cell"
import type { CellState } from "./cell/CellState"
import { Block } from "./Block"
import { Grid } from "./Grid"
import { DIRS } from "../util/direction"
import { Store } from "../store/Store"
import { autorun } from "mobx"
import mousetrap from "mousetrap"
import { loadPuzzle } from "../store/loadPuzzle"

type InitOptions = {
  dom: string | HTMLElement
}

export function init({ dom }: InitOptions) {
  const fixedBoard = loadPuzzle()
  const store = new Store()

  /////
  //
  /////

  // calculate geometry of playing area
  const side = 48
  const width = side * 9 + 4
  const height = side * 9 + 4

  // top left corner of grid
  const ox = (width - side * 9) / 2
  const oy = (height - side * 9) / 2

  const grid = new Grid()

  // Create global SVG object
  const canvas = SVG()
  canvas.addTo(dom).size(width, height)

  for (let band = 0; band < 3; band++) {
    // bands
    for (let stack = 0; stack < 3; stack++) {
      // stacks
      const rx = ox + stack * side * 3
      const ry = oy + band * side * 3

      const block = new Block({
        n: 0,
        coords: [rx, ry, side * 3],
        svg: canvas,
      })
      grid.blocks.push(block)

      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          // pixel based coordinates
          const cx = rx + c * side
          const cy = ry + r * side
          // human readable, 1-based coordinates
          const x = 1 + c + stack * 3
          const y = 1 + r + band * 3
          const key: GridKey = `${x}${y}`

          // rehydrate
          const state = store.get(key) as Partial<CellState>

          const cell = new Cell({
            coords: [cx, cy, side],
            x,
            y,
            bx: c,
            by: r,
            grid,
            state: Object.assign({}, state, fixedBoard[key]),
            svg: canvas,
          })
          grid.add(cell)
        }
      }
    }
  }

  // global keyboard event handlers
  mousetrap.bind("esc", () => {
    grid.clearSelection()
  })

  // arrow keys move focus
  for (const [dir, code] of Object.entries(DIRS)) {
    mousetrap.bind(dir, () => {
      grid.moveFocus(code as DIR)
    })
  }

  // 1-9 for setting values
  const nums = Array.from({ length: 10 }, (_, i) => i.toString())
  for (const num of nums) {
    if (num === "0") continue

    mousetrap.bind(num, () => {
      grid.set(parseInt(num))
    })
  }

  // d for delete
  mousetrap.bind("d", () => {
    grid.state.focused?.clear()
  })

  // p for pencil mode
  // const togglePencil = () => {
  //   const nextState = grid.togglePencil();
  //   pencil.toggle(grid.state.pencil);
  // };

  autorun(() => {
    grid.eachCell((cell) => {
      store.set(cell.key, cell.toJSON())
    })
  })

  grid.render()

  return grid
}
