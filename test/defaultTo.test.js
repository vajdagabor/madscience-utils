import defaultTo from "../src/defaultTo"

describe("defaultTo()", () => {
  const truthyValues = ["monkey", 42, 1, {}, [], Symbol("red"), () => {}]
  it.each(truthyValues)(
    'returns the value when there is only one truthy value: "%p"',
    value => {
      expect(defaultTo(value)).toEqual(value)
    }
  )

  const falsyValues = [0, "", null, NaN, undefined]
  it.each(falsyValues)(
    'returns the value when there is only one falsy value: "%p"',
    value => {
      expect(defaultTo(value)).toEqual(value)
    }
  )

  it("returns the first value that is not undefined, null or NaN", () => {
    expect(defaultTo(undefined, "monkey")).toEqual("monkey")
    expect(defaultTo(undefined, null, NaN, "monkey")).toEqual("monkey")
    expect(defaultTo(undefined, null, NaN, 0, "monkey")).toEqual(0)
    expect(defaultTo(undefined, null, NaN, "", "monkey")).toEqual("")
  })

  it("returns the first value when all of them are undefined, null or NaN", () => {
    expect(defaultTo(null, undefined, NaN)).toEqual(null)
    expect(defaultTo(undefined, NaN, null)).toEqual(undefined)
    expect(defaultTo(NaN, null, undefined)).toEqual(NaN)
  })
})
