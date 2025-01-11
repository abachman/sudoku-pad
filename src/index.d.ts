//             x       y       size
type Coords = [number, number, number]
type Position = { x: number; y: number }

type GridKey = `${number}${number}`
type GridSearch = Record<GridKey, Cell>

type FixedBoard = Record<GridKey, Partial<CellState>>

type UP = 0
type RIGHT = 1
type DOWN = 2
type LEFT = 3

type DIR = UP | RIGHT | DOWN | LEFT

// a draw + edit callback
type ElementModifier = (el: SVG.Element) => void
