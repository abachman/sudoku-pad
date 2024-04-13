import { useGridActions } from "./store/GridStoreProvider"
import { loadPuzzle } from "../util/loadPuzzle"

export const GameControl = () => {
  const { reset, load } = useGridActions()

  return (
    <div className="flex justify-center">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={reset}
      >
        Reset
      </button>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md ml-2"
        onClick={() => load(loadPuzzle())}
      >
        Load
      </button>
    </div>
  )
}
