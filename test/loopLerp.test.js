import loopLerp from "../src/loopLerp"

describe("loopLerp()", () => {
  it("returns an array of two zeroes, when called without parameters", () => {
    expect(loopLerp()).toEqual([0, 0])
  })

  it("returns [a, b] when called with steps = 0 or less", () => {
    expect(loopLerp(10, 20, 0, 360)).toEqual([10, 20])
    expect(loopLerp(10, 20, -1, 360)).toEqual([10, 20])
  })

  it.each`
    a      | b      | steps | edge   | expected
    ${0}   | ${100} | ${4}  | ${150} | ${[0, 140, 130, 120, 110, 100]}
    ${100} | ${0}   | ${4}  | ${150} | ${[100, 110, 120, 130, 140, 0]}
    ${50}  | ${100} | ${4}  | ${150} | ${[50, 60, 70, 80, 90, 100]}
    ${100} | ${50}  | ${4}  | ${150} | ${[100, 90, 80, 70, 60, 50]}
    ${130} | ${30}  | ${4}  | ${150} | ${[130, 140, 0, 10, 20, 30]}
    ${30}  | ${130} | ${4}  | ${150} | ${[30, 20, 10, 0, 140, 130]}
    ${300} | ${30}  | ${2}  | ${360} | ${[300, 330, 0, 30]}
  `(
    "returns $expected when called with a=$a, b=$b, steps=$steps",
    ({ a, b, steps, edge, expected }) => {
      expect(loopLerp(a, b, steps, edge)).toEqual(expected)
    }
  )
})
