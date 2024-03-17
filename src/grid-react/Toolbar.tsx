import {
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/solid"
import { CircleButton } from "./toolbar/Button"
import { PencilToggle } from "./toolbar/PencilToggle"
import { UP, RIGHT, DOWN, LEFT } from "../util/direction"
import { useGridActions } from "./store/GridStoreProvider"

const Toolbar = () => {
  const { moveFocus } = useGridActions()

  return (
    <div className="pt-2 grid gap-1 grid-cols-9">
      <PencilToggle className="col-start-1 row-start-1" />
      <CircleButton className="col-start-2 row-start-1" onClick={() => moveFocus(UP)}>
        <ChevronUpIcon className="w-6 h-6" />
      </CircleButton>
      <CircleButton className="col-start-2 row-start-2" onClick={() => moveFocus(DOWN)}>
        <ChevronDownIcon className="w-6 h-6" />
      </CircleButton>
      <CircleButton className="col-start-1 row-start-2" onClick={() => moveFocus(LEFT)}>
        <ChevronLeftIcon className="w-6 h-6" />
      </CircleButton>
      <CircleButton className="col-start-3 row-start-2" onClick={() => moveFocus(RIGHT)}>
        <ChevronRightIcon className="w-6 h-6" />
      </CircleButton>
    </div>
  )
}

export { Toolbar }
