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
            (set, ...a) => ({
              cells: {},
              pencilMode: false,
              focused: null,
              ...initial,
              ...createActionSlice(set, ...a),
            }),
            {
              name: "zus-sudoku",
              storage: createJSONStorage(() => Persist),
              onRehydrateStorage: () => {
                console.log("rehydrated!");
              },
              merge: (persisted: unknown | GridState, current) => {
                console.log("merge", { persisted, current });
                if (persisted === null) {
                  return current;
                } else {
                  return {
                    ...current,
                    ...persisted,
                  };
                }
              },
              partialize: (persisted) => {
                console.log("partialize", persisted);
                return {
                  cells: persisted.cells,
                };
              },
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
