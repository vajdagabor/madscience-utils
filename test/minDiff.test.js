import minDiff from "../src/minDiff"

describe("minDiff()", () => {
  it("returns 0 when called with a = 0, b = 0, max = zero", () => {
    expect(minDiff(0, 0, 0)).toBe(0)
  })

  it.each`
    a      | b      | max    | expected
    ${0}   | ${100} | ${100} | ${-0}
    ${100} | ${0}   | ${100} | ${0}
    ${10}  | ${20}  | ${100} | ${10}
    ${20}  | ${10}  | ${100} | ${-10}
    ${10}  | ${90}  | ${100} | ${-20}
  `(
    "returns $expected when called with a=$a, b=$b, max=$max",
    ({ a, b, max, expected }) => {
      expect(minDiff(a, b, max)).toBe(expected)
    }
  )
})
