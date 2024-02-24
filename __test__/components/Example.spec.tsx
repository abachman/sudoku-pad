import { render } from "@testing-library/react"

const DummyComponent = () => <h1>Hello, World!</h1>

test("renders a message", () => {
  const { getByText } = render(<DummyComponent />)
  expect(getByText("Hello, World!")).toBeInTheDocument()
})
