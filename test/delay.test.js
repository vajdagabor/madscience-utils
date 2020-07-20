import delay from "../src/delay"
import measure from "../src/measure"

describe("delay()", () => {
  test("It returns a result after the default time period.", async () => {
    const duration = await measure(() => delay(() => {}))
    expect(duration).toBeGreaterThanOrEqual(1000)
  })

  test("It runs the passed function and forwards the return value", async () => {
    const gold = () => 33
    const result = await delay(gold)
    expect(result).toBe(33)
  })

  test("The scheduled minimum time is adjustable with the second attribute", async () => {
    const duration = await measure(() => delay(() => {}, Date.now() + 500))
    expect(duration).toBeGreaterThanOrEqual(500)
  })

  test("Holds until end of delay if there is an error", async () => {
    const fails = () => {
      throw new Error("I don't wanna run…")
    }
    const duration = await measure(() => delay(fails, Date.now() + 500), true)
    expect(duration).toBeGreaterThanOrEqual(500)
  })

  test("Return rejected promise with the original error if the function fails", async () => {
    const errorMsg = "Oh no…"
    const fails = () => {
      throw new Error(errorMsg)
    }
    const result = delay(fails, Date.now() + 10)
    await expect(result).rejects.toThrowError(errorMsg)
  })
})
