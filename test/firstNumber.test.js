import firstNumber from "../src/firstNumber"

describe("firstNumber()", () => {
  it("returns the first value when it is a number", () => {
    expect(firstNumber([10, 20])).toBe(10)
  })

  it("returns the first value that is a number", () => {
    expect(firstNumber(["hello", [], null, undefined, 0, 10, 20])).toBe(0)
  })

  it("returns the fallback, when there is no number value", () => {
    expect(firstNumber(["hello", [], undefined], "oops")).toBe("oops")
  })

  it("returns null, when there is no number value and no fallback", () => {
    expect(firstNumber(["hello", [], undefined])).toBe(null)
  })
})
