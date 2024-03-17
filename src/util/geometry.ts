export const side = 48  // cell w & h
export const borderWeight = 4 // outer border weight

export function gridGeometry(): GridGeometry {
  // padded width & height
  const width = side * 9 + (borderWeight * 2); 
  const height = side * 9 + (borderWeight * 2);

  // top left corner of grid
  const ox = borderWeight / 2;
  const oy = borderWeight / 2;

  const blocks: BlockGeometry[] = []

  for (let band = 0; band < 3; band++) {
    // bands
    for (let stack = 0; stack < 3; stack++) {
      // stacks
      const rx = ox + stack * side * 3;
      const ry = oy + band * side * 3;

      const block: BlockGeometry = {
        x: rx,
        y: ry,
        side: side * 3,
        cells: []
      }

      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          // pixel based coordinates
          const x = rx + c * side;
          const y = ry + r * side;
          // human readable, 1-based coordinates
          const ix = 1 + c + stack * 3;
          const iy = 1 + r + band * 3;

          block.cells.push({
            x,
            y,
            index: [ix, iy],
            key: `${ix}${iy}`,
            side: side
          })
        }
      }

      blocks.push(block)
    }
  }

  console.log('geometry', { width, height, blocks })

  return { width, height, blocks }
}

export function keyToCoord(key: GridKey): [number, number] {
  return [parseInt(key[0]), parseInt(key[1])]
}

export function nextDir(dir: DIR, xy: GridKey): [number, number] {
  const [x, y] = keyToCoord(xy)
  switch (dir) {
    case 0:
      return [x, y - 1];
    case 1:
      return [x + 1, y];
    case 2:
      return [x, y + 1];
    case 3:
      return [x - 1, y];
  }
}
