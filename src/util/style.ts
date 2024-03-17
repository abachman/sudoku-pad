export function style(...objects: any[]) {
  const css = {}
  for (const object of objects) {
    Object.assign(css, object);
  }
  return css as unknown as Partial<React.CSSProperties>;
}

export const pnone = style({
  "pointerEvents": "none",
  "userSelect": "none",
}) 
