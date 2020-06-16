import measure from "../src/measure"

const delay = t => new Promise(resolve => setTimeout(resolve, t))

describe("measure()", () => {
  test("It calls the passed function", async () => {
    const fn = jest.fn()
    await measure(fn)
    expect(fn).toHaveBeenCalled()
  })

  test("It returns a number", async () => {
    const fn = async () => {}
    const result = await measure(fn)
    expect(typeof result).toBe("number")
  })

  test("It measures elapsed time for non-async functions", async () => {
    const start = Date.now()
    const result = await measure(() => {})
    const elapsed = Date.now() - start
    const diff = elapsed - result
    expect(diff).toBeLessThan(10)
    expect(diff).toBeGreaterThan(-10)
  })

  test("It measures elapsed time for async functions", async () => {
    const start = Date.now()
    const result = await measure(() => delay(1000))
    const elapsed = Date.now() - start
    const diff = elapsed - result
    expect(diff).toBeLessThan(10)
    expect(diff).toBeGreaterThan(-10)
  })
})
