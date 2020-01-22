import capitalize from "../src/capitalize"

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
