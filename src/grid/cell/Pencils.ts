import SVG from "@svgdotjs/svg.js"
import { pnone } from "../../util/pnone.ts"

type PencilOptions = {
  coords: Coords
  svg: SVG.Svg
}

export class Pencils {
  static FONT_SIZE = 10
  coords: Coords
  values: Set<number>
  pencils: { [key: number]: SVG.Text }
  svg: SVG.Svg
  step: number

  constructor({ coords, svg }: PencilOptions) {
    this.coords = coords
    this.svg = svg
    this.pencils = {}
    this.values = new Set()
    this.step = coords[2] / 3
  }

  set(ns: number[]) {
    this.values = new Set(ns)
    this.draw()
  }

  draw() {
    for (const n of this.values) {
      if (!this.pencils[n]) {
        this.pencils[n] = this.svg
          .text(n.toString())
          .center(...this.position(n))
          .font({ size: Pencils.FONT_SIZE })
          .css(pnone)
      }
    }
    this.prune()
  }

  prune() {
    for (let n = 0; n < 9; n++) {
      const el = this.pencils[n]
      if (el && !this.values.has(n)) {
        el.remove()
        delete this.pencils[n]
      }
    }
  }

  clear() {
    this.values = new Set()
    this.prune()
  }

  position(input: number): [number, number] {
    const n = input - 1
    const y = Math.floor(n / 3)
    const x = n % 3

    return [
      this.coords[0] + this.step * x + this.step / 2,
      this.coords[1] + this.step * y + this.step / 2 - 1,
    ]
  }
}
