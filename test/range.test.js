import range from "../src/range"

describe("range()", () => {
  it("throws error if called with non-integer parameters", () => {
    expect(() => range(1.1, 2.2)).toThrow()
  })

  it.each`
    a     | b     | expected
    ${10} | ${15} | ${[10, 11, 12, 13, 14, 15]}
    ${1}  | ${2}  | ${[1, 2]}
    ${4}  | ${4}  | ${[4]}
    ${-4} | ${-4} | ${[-4]}
    ${-4} | ${0}  | ${[-4, -3, -2, -1, 0]}
    ${-2} | ${2}  | ${[-2, -1, 0, 1, 2]}
    ${2}  | ${-2} | ${[-2, -1, 0, 1, 2]}
  `("returns a sequential range from $a to $b", ({ a, b, expected }) => {
    expect(range(a, b)).toEqual(expected)
  })
})
