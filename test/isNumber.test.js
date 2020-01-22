import isNumber from "../src/isNumber"

describe("isNumber()", () => {
  const numbers = [10, 12, 234, 0, -10, 0.5, Infinity, -Infinity, NaN]
  const nonNumbers = ["bread", null, undefined, {}, [], Symbol(1)]

  it.each(numbers)("returns true for the number value %p", value => {
    expect(isNumber(value)).toBe(true)
  })

  it.each(nonNumbers)("returns false for non-number value %p", value => {
    expect(isNumber(value)).toBe(false)
  })
})
