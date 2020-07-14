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
})