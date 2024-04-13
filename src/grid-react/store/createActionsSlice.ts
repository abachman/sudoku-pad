import { StateCreator } from "zustand";
import type { GridState } from "./GridState";
import Actions from "./actions";

export const createActionSlice: StateCreator<
  GridState,
  [["zustand/immer", never], ["zustand/persist", unknown]],
  [],
  Pick<GridState, "actions">
> = (set) => {
  return {
    actions: {
      // action triggered from keyboard / toolbar Grid scope
      clearSelection: () => set(Actions.clearFocus()),
      moveFocus: (dir: DIR) => set(Actions.moveFocus(dir)),
      updateValueOrPencil: (value: number) => set(Actions.updateValueOrPencil(value)),

      togglePencil: () =>
        set((state) => {
          state.pencilMode = !state.pencilMode;
        }),

      clearAll: () =>
        set((state) => {
          for (const key in state.cells) {
            if (state.cells[key as GridKey].fixed) continue;
            state.cells[key as GridKey].value = null;
            state.cells[key as GridKey].pencils = null;
          }
        }),

      reset: () =>
        set((state) => {
          if (state.focused) {
            const key = state.focused;
            if (state.cells[key].fixed) return;
            state.cells[key].value = null;
            state.cells[key].pencils = null;
          }
        }),

      // actions triggered from Cell scope
      focus: (key: GridKey) => set(Actions.focus(key)),
      toggleFocus: (key: GridKey) =>
        set((state) => {
          const cell = state.cells[key];
          if (!cell.focused) {
            Actions.focus(key)(state);
          } else {
            cell.focused = false;
          }
        }),

      // load / save
      load: (board: FixedBoard) => set(Actions.loadGameState(board)),
    },
  };
};
