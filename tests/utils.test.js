import {
  capitalize,
  clamp,
  defaultTo,
  firstNumber,
  formatNumber,
  isNumber,
  lerp,
  loopLerp,
  minDiff,
  objectFromArray,
  seriesFromTemplate
} from "../src/utils"

describe("formatNumber()", () => {
  it("throws error if no value is provided", () => {
    expect(() => formatNumber()).toThrow()
  })

  it.each`
    value        | precision | expected
    ${12}        | ${2}      | ${"12.00"}
    ${-24}       | ${4}      | ${"-24.0000"}
    ${0}         | ${3}      | ${"0.000"}
    ${0}         | ${0}      | ${"0"}
    ${1.123456}  | ${2}      | ${"1.12"}
    ${1.987654}  | ${3}      | ${"1.988"}
    ${1.9800001} | ${4}      | ${"1.9800"}
  `(
    'rounds $value to $precision decimal places, and returns "$expected"',
    ({ value, precision, expected }) => {
      expect(formatNumber(value, precision)).toBe(expected)
    }
  )

  it.each`
    value          | precision | expected
    ${0}           | ${5}      | ${"0"}
    ${1}           | ${3}      | ${"1"}
    ${12.12}       | ${4}      | ${"12.12"}
    ${12.12010089} | ${5}      | ${"12.1201"}
  `(
    'removes trailing zeros, when trimZeros argument is true (value=$value, precision=$precision, expected="$expected")',
    ({ value, precision, expected }) => {
      expect(formatNumber(value, precision, true)).toBe(expected)
    }
  )
})

describe("capitalize()", () => {
  it.each`
    value           | expected
    ${"a"}          | ${"A"}
    ${"gabor"}      | ${"Gabor"}
    ${"jANE sMITH"} | ${"JANE sMITH"}
  `(
    "makes the first letter of $value uppercase ($expected)",
    ({ value, expected }) => {
      expect(capitalize(value)).toBe(expected)
    }
  )

  it("returns an empty string when the input is empty string", () => {
    expect(capitalize("")).toBe("")
  })
})

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

describe("clamp()", () => {
  it("returns the original value if no min or max is provided", () => {
    expect(clamp(133)).toBe(133)
  })

  it("returns min if value is less than min", () => {
    expect(clamp(-6, { min: 0 })).toBe(0)
  })

  it("returns max if value is greater than max", () => {
    expect(clamp(132, { max: 100 })).toBe(100)
  })

  it.each`
    value  | min  | max    | expected
    ${370} | ${0} | ${360} | ${10}
    ${-30} | ${0} | ${360} | ${330}
  `(
    "goes in circles when circular is true (value: $value, min: $min, max: $max, expected: $expected)",
    ({ value, min, max, expected }) => {
      expect(clamp(value, { min, max, circular: true })).toBe(expected)
    }
  )
})

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

describe("minDiff()", () => {
  it("returns 0 when called with min = 0, max = 0, edge = zero", () => {
    expect(minDiff(0, 0, 0)).toBe(0)
  })

  it.each`
    min    | max    | edge   | expected
    ${0}   | ${100} | ${100} | ${-0}
    ${100} | ${0}   | ${100} | ${0}
    ${10}  | ${20}  | ${100} | ${10}
    ${20}  | ${10}  | ${100} | ${-10}
    ${10}  | ${90}  | ${100} | ${-20}
  `(
    "returns $expected when called with min=$min, max=$max, edge=$edge",
    ({ min, max, edge, expected }) => {
      expect(minDiff(min, max, edge)).toBe(expected)
    }
  )
})

describe("lerp()", () => {
  it("returns an array of two zeroes, when called without parameters", () => {
    expect(lerp()).toEqual([0, 0])
  })

  it("returns [min, max] when called with steps = 0 or less", () => {
    expect(lerp(10, 20, 0)).toEqual([10, 20])
    expect(lerp(10, 20, -1)).toEqual([10, 20])
  })

  it.each`
    min    | max    | steps | expected
    ${0}   | ${100} | ${4}  | ${[0, 20, 40, 60, 80, 100]}
    ${100} | ${0}   | ${4}  | ${[100, 80, 60, 40, 20, 0]}
    ${10}  | ${13}  | ${2}  | ${[10, 11, 12, 13]}
    ${1}   | ${2}   | ${3}  | ${[1, 1.25, 1.5, 1.75, 2]}
    ${0}   | ${0}   | ${5}  | ${[0, 0, 0, 0, 0, 0, 0]}
    ${-20} | ${20}  | ${3}  | ${[-20, -10, 0, 10, 20]}
  `(
    "returns $expected when called with min=$min, max=$max, steps=$steps",
    ({ min, max, steps, expected }) => {
      expect(lerp(min, max, steps)).toEqual(expected)
    }
  )
})

describe("loopLerp()", () => {
  it("returns an array of two zeroes, when called without parameters", () => {
    expect(loopLerp()).toEqual([0, 0])
  })

  it("returns [min, max] when called with steps = 0 or less", () => {
    expect(loopLerp(10, 20, 0, 360)).toEqual([10, 20])
    expect(loopLerp(10, 20, -1, 360)).toEqual([10, 20])
  })

  it.each`
    min    | max    | steps | edge   | expected
    ${0}   | ${100} | ${4}  | ${150} | ${[0, 140, 130, 120, 110, 100]}
    ${100} | ${0}   | ${4}  | ${150} | ${[100, 110, 120, 130, 140, 0]}
    ${50}  | ${100} | ${4}  | ${150} | ${[50, 60, 70, 80, 90, 100]}
    ${100} | ${50}  | ${4}  | ${150} | ${[100, 90, 80, 70, 60, 50]}
    ${130} | ${30}  | ${4}  | ${150} | ${[130, 140, 0, 10, 20, 30]}
    ${30}  | ${130} | ${4}  | ${150} | ${[30, 20, 10, 0, 140, 130]}
    ${300} | ${30}  | ${2}  | ${360} | ${[300, 330, 0, 30]}
  `(
    "returns $expected when called with min=$min, max=$max, steps=$steps",
    ({ min, max, steps, edge, expected }) => {
      expect(loopLerp(min, max, steps, edge)).toEqual(expected)
    }
  )
})

describe("seriesFromTemplate()", () => {
  it("returns empty array when called without parameters", () => {
    expect(seriesFromTemplate()).toEqual([])
  })

  it("raises error when received a non-array parameter", () => {
    expect(() => {
      seriesFromTemplate("Oh, crap…")
    }).toThrow()
  })

  it.each([
    [null, 1, 2, 3],
    [1, 2, 3, null],
    [null, 1, 2, 3, null],
    [null, null],
  ])(
    "raises error when the first or last item of template is not a number (%p)",
    template => {
      expect(() => {
        seriesFromTemplate(template)
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
      expect(seriesFromTemplate(template)).toEqual(expected)
    }
  )

  it("calculates a series for template with interim fix values", () => {
    const template = [0, null, null, 30, 40, null, null, 100]
    const expected = [0, 10, 20, 30, 40, 60, 80, 100]

    expect(seriesFromTemplate(template)).toEqual(expected)
  })

  it("calculates the right values with interim zero value", () => {
    const template = [80, null, 0, null, 80]
    const expected = [80, 40, 0, 40, 80]

    expect(seriesFromTemplate(template)).toEqual(expected)
  })
})
