import type SVG from "@svgdotjs/svg.js";

type ButtonOptions = {
  svg: SVG.Svg;
  symbol: string;
  coords: Coords;
};

class Button {
  svg: null | SVG.Svg;
  icon?: SVG.Element;
  border?: SVG.Element;
  group?: SVG.G;
  path: string;
  coords: Coords;
  active: boolean = false;

  static PENCIL: string;

  constructor({ svg, symbol, coords }: ButtonOptions) {
    this.svg = svg;
    this.path = symbol;
    this.coords = coords;

    this.draw();
  }

  toggle(val?: boolean) {
    this.active = (typeof val === "boolean") ? val : !this.active;
    this.icon!.fill(this.color());
  }

  click(cb: () => void) {
    this.group!.click(cb);
  }

  private color() {
    return this.active ? "rgb(50, 50, 180)" : "#888";
  }

  private draw() {
    if (!(this.path && this.svg)) return;

    const [x, y, _size] = this.coords;

    this.group = this.svg.group();

    this.border = this.svg.rect(28, 28)
      .stroke("none")
      .fill("#fff")
      .translate(x, y);

    this.icon = this.svg.path(this.path)
      .fill(this.color())
      .stroke("none")
      .translate(x + 6, y + 6)

    this.group.add(this.border);
    this.group.add(this.icon);
  }
}

// edit with https://aydos.com/svgedit/
Button.PENCIL =
  "m22.355 6.619 6.724 6.724-17.021 17.021-6.721-6.724 17.018-17.021zm11.827-1.622-2.999-2.999c-1.159-1.159-3.041-1.159-4.204 0l-2.873 2.873 6.724 6.724 3.351-3.351c.899-.899.899-2.349 0-3.248zm-32.363 28.094c-.122.551 .375 1.044.926 .91l7.493-1.817-6.721-6.724-1.698 7.631z";
// "M 3.323 14.956 L 2.346 10.828 L 8.125 1.468 L 13.23 4.62 L 7.451 13.98 L 3.323 14.956 Z M 6.711 4.709 L 10.966 7.335";
// "m505.99-87.12v3.12h3.12l7.88-7.88-3.12-3.12zm13.76-7.51c.33-.33.33-.85 0-1.18l-1.95-1.95c-.33-.33-.85-.33-1.18 0l-1.63 1.64 3.12 3.12z"

export { Button };
