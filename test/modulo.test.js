import modulo from "../src/modulo"

describe("modulo()", () => {
  it.each`
    value  | min          | max    | expected
    ${370} | ${undefined} | ${360} | ${10}
    ${370} | ${0}         | ${360} | ${10}
    ${-30} | ${0}         | ${360} | ${330}
    ${90}  | ${50}        | ${80}  | ${60}
    ${130} | ${50}        | ${80}  | ${70}
    ${30}  | ${50}        | ${80}  | ${60}
    ${40}  | ${50}        | ${80}  | ${70}
    ${20}  | ${-35}       | ${-10} | ${-30}
    ${-20} | ${-35}       | ${-10} | ${-20}
    ${-40} | ${-35}       | ${-10} | ${-15}
  `(
    "goes in circles between min and max (value: $value, min: $min, max: $max, expected: $expected)",
    ({ value, min, max, expected }) => {
      expect(modulo(value, { min, max })).toBe(expected)
    }
  )
})
