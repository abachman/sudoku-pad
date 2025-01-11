import type SVG from "@svgdotjs/svg.js"
// import { pnone } from "../util/pnone";

type ButtonOptions = {
  svg: SVG.Svg
  symbol: string
  coords: Coords
}

class Button {
  svg: null | SVG.Svg
  icon?: SVG.Element
  border?: SVG.Element
  group?: SVG.G
  path: string
  coords: Coords
  active: boolean = false

  static PENCIL: string
  static DOWNLOAD: string
  static PLUS: string

  constructor({ svg, symbol, coords }: ButtonOptions) {
    this.svg = svg
    this.path = symbol
    this.coords = coords
    this.draw()
  }

  toggle(val?: boolean) {
    this.active = typeof val === "boolean" ? val : !this.active
    this.icon?.fill(this.color())
  }

  click(cb: () => void) {
    this.group?.click(cb)
  }

  private color() {
    return this.active ? "rgb(50, 50, 180)" : "#888"
  }

  private draw() {
    if (!(this.path && this.svg)) return

    const [x, y, size] = this.coords

    const cx = x + size / 2
    const cy = y + size / 2

    this.group = this.svg.group()

    this.icon = this.svg.path(this.path).fill(this.color()).stroke("none").center(cx, cy)

    // // visualizer
    // this.svg.rect(bbox.width, bbox.height)
    //   .fill("rgba(255, 0, 0, 0.2)")
    //   .stroke("none")
    //   .center(cx, cy).css(pnone)

    // scale path to fit in size x size
    const { width, height } = this.icon.bbox()
    let scale: number | null = null
    if (width > height && width > size) {
      scale = size / width
    } else if (height > size) {
      scale = size / height
    }

    if (scale) {
      this.icon.scale(scale, cx, cy)
    }

    const bbox = this.icon.bbox()
    this.border = this.svg.rect(bbox.width, bbox.height).stroke("none").fill("none").center(cx, cy)

    this.group.add(this.border)
    this.group.add(this.icon)
    this.group.css({ cursor: "pointer" })
  }
}

// edit with https://aydos.com/svgedit/
Button.PENCIL = `m22.355 6.619 6.724 6.724-17.021 17.021-6.721-6.724 17.018-17.021zm11.827-1.622-2.999-2.999c-1.159-1.159-3.041-1.159-4.204 0l-2.873 2.873 6.724 6.724 3.351-3.351c.899-.899.899-2.349 0-3.248zm-32.363 28.094c-.122.551 .375 1.044.926 .91l7.493-1.817-6.721-6.724-1.698 7.631z`

// edited with https://yqnn.github.io/svg-path-editor/
Button.DOWNLOAD = `m49.26 62a1.06 1.06 0 001.48 0l12.9-13a1 1 0 000-1.47l-2.32-2.33a1.06 1.06 0 00-1.48 0l-7.15 7.2v-23.86a1 1 0 00-1-1h-3.3a1 1 0 00-1 1v23.86l-7.15-7.16a1.06 1.06 0 00-1.48 0l-2.32 2.33a1 1 0 000 1.47zm-13.26 5h28v6h-28v-6z`

Button.PLUS = `m488 1106-5 0 0 5c0 .55-.447 1-1 1-.553 0-1-.45-1-1l0-5-5 0c-.553 0-1-.45-1-1 0-.55.447-1 1-1l5 0 0-5c0-.55.447-1 1-1 .553 0 1 .45 1 1l0 5 5 0c.553 0 1 .45 1 1 0 .55-.447 1-1 1l0 0zm-6-17c-8.837 0-16 7.16-16 16 0 8.84 7.163 16 16 16 8.837 0 16-7.16 16-16 0-8.84-7.163-16-16-16l0 0z`

export { Button }
