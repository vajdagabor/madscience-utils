import lerpArray from "../src/lerpArray"

describe("lerpArray()", () => {
  it("returns empty array when called without parameters", () => {
    expect(lerpArray()).toEqual([])
  })

  it("raises error when received a non-array parameter", () => {
    expect(() => {
      // @ts-ignore
      lerpArray("Oh, crap…")
    }).toThrow()
  })

  it.each([
    [[null, 1, 2, 3]],
    [[1, 2, 3, null]],
    [[null, 1, 2, 3, null]],
    [[null, null]],
  ])(
    "raises error when the first or last item of template is not a number (%p)",
    template => {
      expect(() => {
        lerpArray(template)
      }).toThrow()
    }
  )

  it.each`
    template                            | expected
    ${[0, null, null, null, null, 100]} | ${[0, 20, 40, 60, 80, 100]}
    ${[20, null, null, 80]}             | ${[20, 40, 60, 80]}
    ${[10, null, null, 17.5]}           | ${[10, 12.5, 15, 17.5]}
  `(
    "calculates a series between the first and last value of the template (template=$template, expected=$expected)",
    ({ template, expected }) => {
      expect(lerpArray(template)).toEqual(expected)
    }
  )

  it("calculates a series for template with interim fix values", () => {
    const template = [0, null, null, 30, 40, null, null, 100]
    const expected = [0, 10, 20, 30, 40, 60, 80, 100]

    expect(lerpArray(template)).toEqual(expected)
  })

  it("calculates the right values with interim zero value", () => {
    const template = [80, null, 0, null, 80]
    const expected = [80, 40, 0, 40, 80]

    expect(lerpArray(template)).toEqual(expected)
  })

  it.each`
    edge   | template                | expected
    ${100} | ${[90, null, null, 20]} | ${[90, 0, 10, 20]}
    ${20}  | ${[20, null, null, 6]}  | ${[20, 2, 4, 6]}
  `(
    "calculates the right values when an edge value is provided",
    ({ edge, template, expected }) => {
      expect(lerpArray(template, edge)).toEqual(expected)
    }
  )
})
