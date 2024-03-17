export type ButtonProps = {
  label?: string
  onClick: () => void
  className?: string
  color?: "white" | "sky"
} & React.HTMLAttributes<HTMLButtonElement>

const buttonStandard = `
  rounded-lg 
  border  
  text-center font-sans uppercase
  focus:outline-none focus:ring 
  p-2
  w[44px] h[44px]
  flex items-center justify-center
`

const buttonColor = `
  border-sky-800 bg-sky-800 text-white
  hover:bg-transparent hover:text-sky-800
  active:text-sky-500 active:bg-white 
`

const buttonWhite = `
  border-sky-800 bg-transparent text-sky-800
  hover:bg-sky-800 hover:text-white
  active:bg-sky-500 active:text-white 
`

export function Button(props: ButtonProps) {
  const className = `${buttonStandard}
                     ${props.color === "white" ? buttonWhite : buttonColor}
                     ${props.className}`

  return (
    <button className={className} onClick={props.onClick}>
      {props.label || props.children}
    </button>
  )
}

export function CircleButton(props: ButtonProps) {
  const className = `middle none relative rounded-full ${props.className || ""}`
  return <Button {...props} className={className} />
}

type ToggleProps = ButtonProps & { active: boolean }

export function ToggleButton(props: ToggleProps) {
  return <Button {...props} color={props.active ? "sky" : "white"} />
}
