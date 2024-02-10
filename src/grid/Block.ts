import SVG from "@svgdotjs/svg.js";
import { Square } from "./Square.ts";
import { pnone } from "../util/pnone.ts";

class Block extends Square {
  n: number;

  constructor({ coords, n, svg }: { coords: Coords; n: number, svg: SVG.Svg }) {
    super({ coords, svg });
    this.n = n;
  }

  render() {
    this.group = this.border((el) => {
      el.stroke({ color: "#000", width: 3 })
        .css(pnone);
    });
  }
}

export { Block };
