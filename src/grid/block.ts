import SVG from "@svgdotjs/svg.js";
import { Square } from "./square.ts";
import { pnone } from "../util/pnone.ts";

class Block extends Square {
  n: number;

  constructor({ coords, n }: { coords: Coords; n: number }) {
    super({ coords });
    this.n = n;
  }

  draw(canvas: SVG.Svg) {
    this.element = this.trace(canvas);
    this.element.attr({ strokeWidth: 3, fill: "transparent" }).css(pnone);
  }
}

export { Block };
