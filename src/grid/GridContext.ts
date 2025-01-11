import type { Grid } from "./Grid"
import { createContext } from "react"

// https://mobx.js.org/react-integration.html
export const GridContext = createContext<Grid>(null as any)
