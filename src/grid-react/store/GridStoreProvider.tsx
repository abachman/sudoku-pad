import { ReactNode, createContext, useRef, useContext } from "react"
import { StoreApi, useStore } from "zustand"
import type { GridState } from "./GridState"
import { createGridStore } from "./createStore"

export const GridStoreContext = createContext<StoreApi<GridState> | null>(null)

export interface GridStoreProviderProps {
  children: ReactNode
}

export const GridStoreProvider = ({ children }: GridStoreProviderProps) => {
  const storeRef = useRef<ReturnType<typeof createGridStore>>()

  if (!storeRef.current) {
    // createGridStore call is deferred until the first render
    storeRef.current = createGridStore()
  }

  return <GridStoreContext.Provider value={storeRef.current}>{children}</GridStoreContext.Provider>
}

export const useGridStore = <T,>(selector: (store: GridState) => T): T => {
  const storeContext = useContext(GridStoreContext)

  if (!storeContext) {
    throw new Error(`useGridStore must be use within GridStoreProvider`)
  }

  return useStore(storeContext, selector)
}

const actionsSelector = (state: GridState) => state.actions
export const useGridActions = () => useGridStore(actionsSelector)
