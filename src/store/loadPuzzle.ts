import one from "../../puzzles/one.json"

export function loadPuzzle(): FixedBoard {
  const fixedBoard: FixedBoard = {}
  let r = 0;
  let c = 0;
  for (const value of one.board.split('')) {
    if (value !== '0') {
      fixedBoard[`${c+1}${r+1}`] = {
        value: parseInt(value),
        fixed: true
      }
    }

    c += 1
    if (c === 9) {
      c = 0
      r += 1
    }
  }

  return fixedBoard
}
