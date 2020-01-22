import lerp from "../src/lerp"

describe("lerp()", () => {
  it("returns an array of two zeroes, when called without parameters", () => {
    expect(lerp()).toEqual([0, 0])
  })

  it("returns [a, b] when called with steps = 0 or less", () => {
    expect(lerp(10, 20, 0)).toEqual([10, 20])
    expect(lerp(10, 20, -1)).toEqual([10, 20])
  })

  it.each`
    a      | b      | steps | expected
    ${0}   | ${100} | ${4}  | ${[0, 20, 40, 60, 80, 100]}
    ${100} | ${0}   | ${4}  | ${[100, 80, 60, 40, 20, 0]}
    ${10}  | ${13}  | ${2}  | ${[10, 11, 12, 13]}
    ${1}   | ${2}   | ${3}  | ${[1, 1.25, 1.5, 1.75, 2]}
    ${0}   | ${0}   | ${5}  | ${[0, 0, 0, 0, 0, 0, 0]}
    ${-20} | ${20}  | ${3}  | ${[-20, -10, 0, 10, 20]}
  `(
    "returns $expected when called with a=$a, b=$b, steps=$steps",
    ({ a, b, steps, expected }) => {
      expect(lerp(a, b, steps)).toEqual(expected)
    }
  )
})
