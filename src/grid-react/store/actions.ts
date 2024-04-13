import type { Draft } from "immer";
import type { GridState } from "./GridState";
import { nextDir } from "../../util/geometry";

type ActionOptions = {
  except?: GridKey;
};

type Action = (state: Draft<GridState>, options?: ActionOptions) => void;
type ActionProducer = (...a: any[]) => Action;

const focus: ActionProducer = (key: GridKey) => {
  return (state) => {
    if (state.focused) {
      state.cells[state.focused].focused = false;
    }
    state.cells[key].focused = true;
    state.focused = key;
  };
};

const clearFocus: ActionProducer = () =>
(
  state,
  { except } = {},
) => {
  for (const key in state.cells) {
    if (key === except) continue;
    state.cells[key as GridKey].focused = false;
  }
  state.focused = null;
};

const moveFocus: ActionProducer = (dir: DIR) => {
  return (state) => {
    if (!state.focused) return focus("11")(state);

    const key = state.focused
    const [x, y] = nextDir(dir, key);
    const nextKey = `${x}${y}` as GridKey;
    if (state.cells[nextKey]) return focus(nextKey)(state);
  }
}

const updatePencil: ActionProducer = (key: GridKey, value: number) => {
  return (state) => {
    state.cells[key].value = null;
    state.cells[key].pencils = state.cells[key].pencils?.includes(value)
      ? (state.cells[key].pencils?.filter((n: number) => n !== value) || [])
      : [...(state.cells[key].pencils || []), value];
  }
}

const updateValue: ActionProducer = (key: GridKey, value: number) => {
  return (state) => {
    state.cells[key].pencils = null;
    state.cells[key].value = value;
  }
}

const updateValueOrPencil: ActionProducer = (value: number) => {
  return (state) => {
    if (state.focused) {
      const key = state.focused;

      if (state.cells[key].fixed) return

      if (state.pencilMode) {
        updatePencil(key, value)(state);
      } else {
        updateValue(key, value)(state);
      }
    }
  }
}

const loadGameState: ActionProducer = (game: FixedBoard) => {
  return (state) => {
    for (const _key in game) {
      const key = _key as GridKey;
      if (state.cells[key]) {
        state.cells[key] = {
          ...state.cells[key],
          ...game[key],
        };
      }
    }
  };
}

export default {
  clearFocus,
  moveFocus,
  focus,
  updateValueOrPencil,
  loadGameState,
};
