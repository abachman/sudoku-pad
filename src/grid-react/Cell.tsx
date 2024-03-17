import { useGridStore, useGridActions } from "./store/GridStoreProvider"

// position of a pencil mark in a cell
function position(cell: CellGeometry, input: number): [number, number] {
  const n = input - 1
  const y = Math.floor(n / 3)
  const x = n % 3
  const step = cell.side / 3

  return [cell.x + step * x + step / 2, cell.y + step * y + step / 2 - 1]
}

const Focus = ({ cell }: { cell: CellGeometry }) => {
  const className = `
    stroke-sky-800 opacity-50 stroke-[6px] fill-transparent
  `

  return (
    <rect
      x={cell.x + 3}
      y={cell.y + 3}
      width={cell.side - 6}
      height={cell.side - 6}
      className={className}
    />
  )
}

const Value = ({ cell }: { cell: CellGeometry }) => {
  const value = useGridStore((state) => state.cells[cell.key].value)

  if (!value) return null

  return (
    <text
      x={cell.x + cell.side / 2}
      y={cell.y + cell.side / 2}
      dominantBaseline="middle"
      textAnchor="middle"
      className="font-bold text-black text-[18px] user-select-none"
    >
      {value}
    </text>
  )
}

const Pencils = ({ cell }: { cell: CellGeometry }) => {
  const values = useGridStore((state) => state.cells[cell.key].pencils)

  if (!values || values.length === 0) return null

  return (
    <g id={cell.key + "-pencils"}>
      {values.map((i: number) => {
        const [x, y] = position(cell, i)
        return (
          <text
            key={`pencil-${i}`}
            x={x}
            y={y}
            dominantBaseline="middle"
            textAnchor="middle"
            className="text-gray-800 text-[10px] user-select-none"
          >
            {i}
          </text>
        )
      })}
    </g>
  )
}

const Box = ({ cell }: { cell: CellGeometry }) => {
  const cellState = useGridStore((state) => state.cells[cell.key])
  const boxClass = `${cellState.fixed ? "fill-sky-500" : "fill-white"} stroke-black stroke-[1px]`

  return <rect x={cell.x} y={cell.y} width={cell.side} height={cell.side} className={boxClass} />
}

export function Cell({ cell }: { cell: CellGeometry }) {
  const cellState = useGridStore((state) => state.cells[cell.key])
  const { toggleFocus } = useGridActions()

  const id = `cell-${cell.key}`

  return (
    <g id={id}>
      <Box cell={cell} />

      {/* value */}
      <Value cell={cell} />

      {/* pencil marks */}
      <Pencils cell={cell} />

      {/* focus decoration */}
      {cellState.focused && <Focus cell={cell} />}

      {/* click handler overlay */}
      <rect
        x={cell.x}
        y={cell.y}
        width={cell.side}
        height={cell.side}
        className="fill-transparent"
        onClick={() => {
          toggleFocus(cell.key)
        }}
      />
    </g>
  )
}
