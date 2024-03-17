import { useEffect } from "react"
import mousetrap from "mousetrap"
import { useGridActions } from "./store/GridStoreProvider"
import { DIRS } from "../util/direction"

export function KeyboardControls() {
  const actions = useGridActions()

  useEffect(() => {
    mousetrap.bind("esc", () => {
      actions.clearSelection()
    })

    // arrow keys move focus
    for (const [dir, code] of Object.entries(DIRS)) {
      mousetrap.bind(dir, () => {
        actions.moveFocus(code as DIR)
      })
    }

    // numbers update value
    for (let i = 1; i <= 9; i++) {
      mousetrap.bind(i.toString(), () => {
        actions.updateValueOrPencil(i)
      })
    }

    mousetrap.bind("p", () => {
      actions.togglePencil()
    })

    mousetrap.bind("d", () => {
      actions.reset()
    })

    return () => {
      mousetrap.reset()
    }
  }, [])

  return null
}
