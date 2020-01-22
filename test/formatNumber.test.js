import formatNumber from "../src/formatNumber"

describe("formatNumber()", () => {
  it("throws error if no value is provided", () => {
    // @ts-ignore
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
