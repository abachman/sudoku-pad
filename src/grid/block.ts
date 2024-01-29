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
    this.group = this.border(canvas, (el) => {
      el.stroke({ color: "#000", width: 3 })
        .css(pnone);
    });
  }
}

export { Block };
