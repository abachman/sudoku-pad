import type SVG from "@svgdotjs/svg.js";
import { pnone } from "../util/pnone.ts";
import { Pencils } from "./cell/Pencils";

class Square {
  coords: Coords;
  center: Position;
  _label: null | SVG.Text;
  svg: SVG.Svg;
  element: null | SVG.Rect;
  group: null | SVG.G;
  private pencils: Pencils;

  // decoration
  focusDecoration: null | SVG.Element;

  constructor({ coords, svg }: { coords: Coords, svg: SVG.Svg }) {
    this.coords = coords; // geometry
    this.center = {
      x: this.coords[0] + this.coords[2] / 2,
      y: this.coords[1] + this.coords[2] / 2,
    };
    this._label = null;
    this.element = null;
    this.group = null;
    this.focusDecoration = null;
    this.svg = svg
    this.pencils = new Pencils({ coords: this.coords, svg });
  }

  label(str: string, options: { fill?: string; bold?: boolean } = {}) {
    this.pencils.clear();

    if (this._label) {
      this._label.text(str)
        .font({ size: 16, weight: options.bold ? "bold" : "normal" })
        .fill(options.fill || "#000");
    } else if (this.svg) {
      this._label = this.svg.text(str)
        .font({ size: 16, weight: options.bold ? "bold" : "normal" })
        .fill(options.fill || "#000")
        .css(pnone);
    }

    this._label?.center(this.center.x, this.center.y);
  }

  unlabel() {
    this._label?.remove();
  }

  pencil(ns: number[]) {
    this._label?.remove();
    this.pencils.set(ns);
  }

  unpencil() {
    this.pencils.clear();
  }

  trace(): SVG.Rect {
    const [cx, cy, w] = this.coords;
    return this.svg.rect(w, w).attr({
      x: cx,
      y: cy,
      fill: "#fff",
      stroke: "#000",
      strokeWidth: 1,
    });
  }

  border(cb: ElementModifier): SVG.G {
    const g = this.svg.group();

    const [cx, cy, w] = this.coords;
    const lines = [
      [cx - 1, cy, cx + w + 1, cy], // top
      [cx + w, cy - 1, cx + w, cy + w + 1], // right
      [cx + w + 1, cy + w, cx - 1, cy + w], // bottom
      [cx, cy + w + 1, cx, cy - 1], // left
    ];

    for (const [x1, y1, x2, y2] of lines) {
      const line = this.svg.line(x1, y1, x2, y2);
      g.add(line);
      cb(line);
    }

    return g;
  }

  decorate() {
    if (this.focusDecoration) {
      // already decorated
      return;
    }

    // inner border
    const [cx, cy, w] = this.coords;
    if (this.svg) {
      this.focusDecoration = this.svg?.rect(w - 6, w - 5).attr({
        x: cx + 3,
        y: cy + 3,
        fill: "transparent",
        class: "stroke-sky-800 opacity-50",
        "stroke-width": 6,
      }).css(pnone);
    }
  }

  undecorate() {
    if (this.focusDecoration) {
      this.focusDecoration.remove();
      this.focusDecoration = null;
    }
  }

  clear() {
    this._label?.remove();
  }
}

export { Square };
