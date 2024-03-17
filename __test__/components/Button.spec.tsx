import { Button } from "./index"
import { render, fireEvent } from "@testing-library/react"

describe("Button", () => {
  it("renders with label", () => {
    const onClick = jest.fn()
    const { getByText } = render(<Button onClick={onClick}>Hello, World!</Button>)
    expect(getByText("Hello, World!")).toBeInTheDocument()
  })

  it("is clickable", () => {
    const onClick = jest.fn()
    const { getByText } = render(<Button onClick={onClick}>clickme</Button>)
    fireEvent.click(getByText("clickme"))
    expect(onClick).toHaveBeenCalled()
  })
})


