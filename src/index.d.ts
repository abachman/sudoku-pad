type Position = { x: number; y: number }

type GridKey = `${number}${number}`
type Board = Record<GridKey, CellState>;
type FixedBoard = Record<GridKey, Partial<CellState>>

// movement
type UP = 0
type RIGHT = 1
type DOWN = 2
type LEFT = 3
type DIR = UP | RIGHT | DOWN | LEFT

type PixelCoordinate = number
type PixelDimension = number
type HumanCoordinate = number

// React-based Grid Component Library
interface CellState {
  key: GridKey;
  value: number | null;
  pencils: number[] | null;
  focused: boolean;
  fixed: boolean;
  color: Color;
}

type CellGeometry = {
  x: PixelCoordinate
  y: PixelCoordinate
  side: PixelDimension
  index: [HumanCoordinate, HumanCoordinate] 
  key: GridKey
}

type BlockGeometry = {
  x: PixelCoordinate
  y: PixelCoordinate
  side: PixelDimension
  cells: CellGeometry[]
}

type GridGeometry = {
  width: PixelDimension
  height: PixelDimension
  blocks: BlockGeometry[]
}
