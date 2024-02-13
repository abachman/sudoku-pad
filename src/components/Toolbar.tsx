import { observer } from 'mobx-react-lite'
import { GridContext } from "../grid/GridContext"
import { useContext } from "react"
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  PencilIcon,
} from "@heroicons/react/24/solid"
import { CircleButton, ToggleButton } from "./Button"
import { UP, RIGHT, DOWN, LEFT } from "../util/direction"

const Toolbar = observer(() => {
  const grid = useContext(GridContext)

  return (
    <div className="pt-2">
      <ToggleButton
        onClick={() => grid.togglePencil()}
        active={grid.state.pencil as boolean}
      >
        <PencilIcon className="w-6 h-6" />
      </ToggleButton>
      <CircleButton onClick={() => grid.moveFocus(UP)}>
        <ChevronUpIcon className="w-6 h-6" />
      </CircleButton>
      <CircleButton onClick={() => grid.moveFocus(DOWN)}>
        <ChevronDownIcon className="w-6 h-6" />
      </CircleButton>
      <CircleButton onClick={() => grid.moveFocus(LEFT)}>
        <ChevronLeftIcon className="w-6 h-6" />
      </CircleButton>
      <CircleButton onClick={() => grid.moveFocus(RIGHT)}>
        <ChevronRightIcon className="w-6 h-6" />
      </CircleButton>
      <span>{grid.state.focused?.key}</span>
    </div>
  )
})

export { Toolbar }
