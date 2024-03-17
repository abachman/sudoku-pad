import { createRoot } from "react-dom/client"

import type { Grid } from "./grid/Grid"
// import { GridContext } from "./grid/GridContext"
// import { init } from "./grid/init"
// import { App } from "./components/App"
import { App } from "./grid-react/App"
import "./style.css"

import game from "../saves/game_002.json"

// expose grid state to browser console
declare global {
  interface Window {
    grid: Grid
    games: any[]
  }
}

window.games = [game]

const root = createRoot(document.getElementById("controls") as HTMLElement)

root.render(<App />)

// const grid = init({ dom: "#app" })
// window.grid = grid
// root.render(
//   <GridContext.Provider value={grid}>
//     <App />
//   </GridContext.Provider>,
// )
