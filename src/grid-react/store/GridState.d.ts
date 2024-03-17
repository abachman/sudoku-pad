type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
type Transparent = "transparent";

type Color = RGB | RGBA | HEX | Transparent;

export interface GridState {
  cells: Board;
  focused: GridKey | null;
  pencilMode: boolean;
  actions: {
    // Grid scope
    togglePencil: () => void;
    clearAll: () => void;
    clearSelection: () => void;
    updateValueOrPencil: (value: number) => void;
    reset: () => void;
    moveFocus: (dir: DIR) => void;

    // Cell scope
    focus: (key: GridKey) => void;
    toggleFocus: (key: GridKey) => void;
  };
}

export type InitialState = Partial<GridState>;
