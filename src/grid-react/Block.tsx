import { Cell } from "./Cell"
import { pnone, style } from "../util/style"
import { borderWeight } from "../util/geometry"

function Border({ block }: { block: BlockGeometry }) {
  const css = style(pnone, {
    stroke: "black",
    strokeWidth: borderWeight,
    fill: "none",
  })

  const pad = borderWeight / 2

  return (
    <>
      {/* top */}
      <line
        x1={block.x - pad}
        y1={block.y}
        x2={block.x + block.side + pad}
        y2={block.y}
        style={css}
      />
      {/* right */}
      <line
        x1={block.x + block.side}
        y1={block.y - pad}
        x2={block.x + block.side}
        y2={block.y + block.side + pad}
        style={css}
      />
      {/* bottom */}
      <line
        x1={block.x - pad}
        y1={block.y + block.side}
        x2={block.x + block.side + pad}
        y2={block.y + block.side}
        style={css}
      />
      {/* left */}
      <line
        x1={block.x}
        y1={block.y - pad}
        x2={block.x}
        y2={block.y + block.side + pad}
        style={css}
      />
    </>
  )
}

export function Block({ block }: { block: BlockGeometry }) {
  const id = `block-${block.x}-${block.y}`

  return (
    <g id={id}>
      {block.cells.map((cell) => (
        <Cell key={cell.key} cell={cell} />
      ))}
      <Border block={block} />
    </g>
  )
}
