import { useEffect, useState } from "react"
import { gridGeometry } from "../util/geometry"
import { Block } from "./Block"

export function Grid() {
  const [blocks, setBlocks] = useState<BlockGeometry[]>([])
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })

  useEffect(() => {
    const { width, height, blocks } = gridGeometry()
    setSize({ width, height })
    setBlocks(blocks)
  }, [])

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size.width}
      height={size.height}
      fill="currentColor"
      viewBox={`0 0 ${size.width} ${size.height}`}
    >
      {blocks.map((block) => (
        <Block key={`${block.x}${block.y}`} block={block} />
      ))}
    </svg>
  )
}
