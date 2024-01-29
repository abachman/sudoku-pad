import type SVG from "@svgdotjs/svg.js"
import { pnone } from "../util/pnone.ts"

class Square {
  coords: Coords
  center: Position
  _label: null | SVG.Text
  svg: null | SVG.Svg
  element: null | SVG.Rect;
  group: null | SVG.G;

  // decoration
  focusDecoration: null | SVG.Element

  constructor({ coords }: { coords: Coords }) {
    this.coords = coords // geometry
    this.center = {
      x: this.coords[0] + this.coords[2] / 2,
      y: this.coords[1] + this.coords[2] / 2,
    }
    this._label = null
    this.svg = null
    this.element = null
    this.group = null
    this.focusDecoration = null
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

  border(canvas: SVG.Svg, cb: ElementModifier): SVG.G {
    this.svg = canvas;
    const g = canvas.group()

    const [cx, cy, w] = this.coords;
    const lines = [
      [cx - 1, cy,  cx + w + 1, cy], // top
      [cx + w, cy - 1, cx + w, cy + w + 1], // right
      [cx + w + 1, cy + w, cx - 1, cy + w], // bottom
      [cx, cy + w + 1, cx, cy - 1], // left
    ]

    for (const [x1, y1, x2, y2] of lines) {
      const line = canvas.line(x1, y1, x2, y2)
      g.add(line)
      cb(line)
    }

    return g
  }

  focus() {
    if (this.focusDecoration) {
      // already decorated
      return
    }

    // inner border
    const [cx, cy, w] = this.coords;
    if (this.svg) {
      this.focusDecoration = this.svg?.rect(w - 6, w - 5).attr({
        x: cx + 3,
        y: cy + 3,
        fill: "transparent",
        stroke: "rgba(50, 50, 200, 0.5)",
        "stroke-width": 6,
      }).css(pnone)
    }
  }

  clearFocus() {
    if (this.focusDecoration) {
      this.focusDecoration.remove()
      this.focusDecoration = null
    }
  }
}

export { Square }
