import clamp from "../src/clamp"

describe("clamp()", () => {
  it("returns the original value if no min or max is provided", () => {
    expect(clamp(133)).toBe(133)
  })

  it.each`
    value | min   | expected
    ${-6} | ${0}  | ${0}
    ${5}  | ${10} | ${10}
    ${-5} | ${10} | ${10}
  `(
    "returns min if value ($value) is less than min ($min)",
    ({ value, min, expected }) => {
      expect(clamp(value, { min: min })).toBe(expected)
    }
  )

  it.each`
    value | max   | expected
    ${9}  | ${5}  | ${5}
    ${0}  | ${-5} | ${-5}
    ${-2} | ${-5} | ${-5}
  `(
    "returns max if value ($value) is less than max ($max)",
    ({ value, max, expected }) => {
      expect(clamp(value, { max: max })).toBe(expected)
    }
  )

  it.each`
    value | min   | max   | expected
    ${5}  | ${0}  | ${5}  | ${5}
    ${0}  | ${0}  | ${5}  | ${0}
    ${3}  | ${0}  | ${5}  | ${3}
    ${0}  | ${3}  | ${5}  | ${3}
    ${9}  | ${3}  | ${5}  | ${5}
    ${9}  | ${-4} | ${-1} | ${-1}
    ${-9} | ${-4} | ${-1} | ${-4}
  `(
    "clamping value ($value) between min ($min) and max ($max) gives the correct result ($expected)",
    ({ value, min, max, expected }) => {
      expect(clamp(value, { min: min, max: max })).toBe(expected)
    }
  )
})
