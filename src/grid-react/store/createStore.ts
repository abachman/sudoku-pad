import { create } from "zustand";
import {
  createJSONStorage,
  devtools,
  persist,
  subscribeWithSelector,
} from "zustand/middleware";
import { Persist } from "./Persist";
import { immer } from "zustand/middleware/immer";

import { createActionSlice } from "./createActionsSlice";
import { GridState, InitialState } from "./GridState";

const defaultState: InitialState = {
  cells: {},
  pencilMode: false,
  focused: null,
};

export function createGridStore(
  initial: InitialState = defaultState,
) {
  // populate empty cells grid
  for (let x = 1; x <= 9; x++) {
    for (let y = 1; y <= 9; y++) {
      const key: GridKey = `${x}${y}`;
      defaultState.cells = defaultState.cells || {};
      defaultState.cells[key] = {
        key,
        value: null,
        pencils: null,
        focused: false,
        fixed: false,
        color: "transparent",
      };
    }
  }

  return create<GridState>()(
    subscribeWithSelector(
      immer(
        devtools(
          persist(
            (...a) => ({
              cells: {},
              pencilMode: false,
              focused: null,
              ...initial,
              ...createActionSlice(...a),
            }),
            {
              name: "zus-sudoku",
              storage: createJSONStorage(() => Persist),
            },
          ),
          {
            name: "Zus",
            trace: true,
          },
        ),
      ),
    ),
  );
}
