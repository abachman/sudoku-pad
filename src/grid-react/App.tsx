import { Toolbar } from "./Toolbar"
import { Grid } from "./Grid"
import { KeyboardControls } from "./KeyboardControls"
import { GridStoreProvider } from "./store/GridStoreProvider"

export function App() {
  return (
    <GridStoreProvider>
      <KeyboardControls />
      <div className="pt-2">
        <Grid />
        <Toolbar />
      </div>
    </GridStoreProvider>
  )
}
