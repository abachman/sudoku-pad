import SVG from "@svgdotjs/svg.js"
import { pnone } from "../util/pnone.ts"

class Square {
  coords: Coords
  center: Position
  _label: null | SVG.Text
  svg: null | SVG.Svg
  element: SVG.Rect | null;

  constructor({ coords }: { coords: Coords }) {
    this.coords = coords // geometry
    this.center = {
      x: this.coords[0] + this.coords[2] / 2,
      y: this.coords[1] + this.coords[2] / 2,
    }
    this._label = null
    this.svg = null
    this.element = null
  }

  label(str: string) {
    if (this._label) {
      this._label.text(str)
    } else if (this.svg) {
      this._label = this.svg.text(str).css(pnone)
    }

    if (this._label) 
      this._label.center(this.center.x, this.center.y)
  }

  trace(canvas: SVG.Svg): SVG.Rect {
    this.svg = canvas;

    const [cx, cy, w] = this.coords;
    return canvas.rect(w, w).attr({
      x: cx,
      y: cy,
      fill: "#fff",
      stroke: "#000",
      strokeWidth: 1,
    });
  }
}

export { Square }
