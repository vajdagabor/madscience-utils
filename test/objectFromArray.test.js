import objectFromArray from "../src/objectFromArray"

describe("objectFromArray()", () => {
  it("returns an empty object when got an empty array", () => {
    expect(objectFromArray([])).toEqual({})
  })

  it("assigns each item to a key", () => {
    const array = [10, 20, 30]
    const keys = ["a", "b", "c"]
    const expected = { a: 10, b: 20, c: 30 }
    expect(objectFromArray(array, keys)).toEqual(expected)
  })

  it("assigns each item to a key character when keys are given as one string", () => {
    const array = [10, 20, 30]
    const keys = "abc"
    const expected = { a: 10, b: 20, c: 30 }
    expect(objectFromArray(array, keys)).toEqual(expected)
  })
})
