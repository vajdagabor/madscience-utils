/**
 * Generates a list of evenly distributed numbers between `a` and `b`.
 *
 * @param {number} a
 * @param {number} b
 * @param {number} steps - The number of values to be generated between `a` and `b`
 * @returns {number[]} - A list of evenly distributed numbers between `a` and `b` (and including `a` and `b`)
 */
function lerp(a = 0, b = 0, steps = 0) {
  const positiveSteps = steps < 0 ? 0 : steps
  const step = (b - a) / (positiveSteps + 1)
  const transRegion = Array(positiveSteps)
    .fill(undefined)
    .map((_, i) => a + step * (i + 1))
  return [a, ...transRegion, b]
}

export default lerp
