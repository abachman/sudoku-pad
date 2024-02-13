import SVG from "@svgdotjs/svg.js";
import { Square } from "./Square.ts";
import { pnone } from "../util/pnone.ts";

class Block extends Square {
  constructor({ coords, svg }: { coords: Coords; n: number; svg: SVG.Svg }) {
    super({ coords, svg });
  }

  render() {
    this.group = this.border((el) => {
      el.stroke({ color: "#000", width: 3 }).css(pnone);
    });
  }
}

export { Block };
