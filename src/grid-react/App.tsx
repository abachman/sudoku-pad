import { Toolbar } from "./Toolbar"
import { Grid } from "./Grid"
import { KeyboardControls } from "./KeyboardControls"
import { GameControl } from "./GameControl"
import { GridStoreProvider } from "./store/GridStoreProvider"

export function App() {
  return (
    <GridStoreProvider>
      <KeyboardControls />
      <div className="pt-2">
        <Grid />
        <Toolbar />
      </div>

      <div className="pt-2">
        <GameControl />
      </div>
    </GridStoreProvider>
  )
}
