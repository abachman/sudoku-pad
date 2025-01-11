type DOMContentLoadedHandler = (this: Document, ev: Event) => void

export function domReady(fn: DOMContentLoadedHandler): void {
  if (document.readyState === "interactive" || document.readyState === "complete") {
    fn()
  } else {
    document.addEventListener("DOMContentLoaded", fn)
  }
}
