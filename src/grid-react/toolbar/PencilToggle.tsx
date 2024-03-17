import { PencilIcon } from "@heroicons/react/24/solid"
import { ToggleButton, type ButtonProps } from "./Button"
import { useGridStore, useGridActions } from "../store/GridStoreProvider"

export const PencilToggle = (props: Omit<ButtonProps, 'onClick'>) => {
  const pencilMode = useGridStore((state) => state.pencilMode)
  const { togglePencil } = useGridActions()

  return (
    <ToggleButton {...props} onClick={() => togglePencil()} active={pencilMode}>
      <PencilIcon className="w-6 h-6" />
    </ToggleButton>
  )
}
