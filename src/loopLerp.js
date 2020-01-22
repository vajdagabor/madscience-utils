import minDiff from "./minDiff"

/**
 * Generates a list of evenly distributed numbers in a circular range,
 * in the shortest distance between values `a` and `b`.
 *
 * @param {number} a
 * @param {number} b
 * @param {number} steps
 * @param {number} edge
 * @returns {number[]}
 */
function loopLerp(a = 0, b = 0, steps = 0, edge = 0) {
  const positiveSteps = steps < 0 ? 0 : steps
  const diff = minDiff(a, b, edge)
  const stepSize = diff / (positiveSteps + 1)
  const transRegion = Array(positiveSteps)
    .fill(undefined)
    .map((_, i) => {
      let step = (a + stepSize * (i + 1)) % edge
      return step < 0 ? edge + step : step
    })
  return [a, ...transRegion, b]
}

export default loopLerp
