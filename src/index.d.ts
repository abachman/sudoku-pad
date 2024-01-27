//             x       y       size
type Coords = [number, number, number]
type Position = { x: number; y: number }

type GridKey = `${number}${number}`
type GridSearch = Record<GridKey, Cell>;
