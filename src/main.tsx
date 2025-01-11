import React from "react"
import { createRoot } from "react-dom/client"

import type { Grid } from "./grid/Grid"
import { GridContext } from "./grid/GridContext"
import { init } from "./grid/init"
import { App } from "./components/App"
import "./style.css"

declare global {
  interface Window {
    grid: Grid
  }
}

const grid = init({ dom: "#app" })
window.grid = grid

const root = createRoot(document.getElementById("controls") as HTMLElement)

root.render(
  <GridContext.Provider value={grid}>
    <App />
  </GridContext.Provider>,
)
