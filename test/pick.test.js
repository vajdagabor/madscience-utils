import pick from "../src/pick"

describe("pick()", () => {
  const people = {
    john: { age: 22, profession: "telephone cleaner" },
    mary: { age: 42, profession: "hairdresser" },
    paco: { age: 58, profession: "butcher" },
  }

  it("Returns the selected subset of the object", () => {
    const result = pick(people, ["john", "mary"])
    const expected = {
      john: { age: 22, profession: "telephone cleaner" },
      mary: { age: 42, profession: "hairdresser" },
    }
    expect(result).toEqual(expected)
  })

  it("Returns empty object when there are no keys that match", () => {
    const result = pick(people, ["ursula", "xavier"])
    const expected = {}
    expect(result).toEqual(expected)
  })
})
