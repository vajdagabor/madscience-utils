/**
 * Returns an array of sequential integers from `a` to `b`
 *
 * @param {number} a
 * @param {number} b
 * @return {number[]}
 */
function range(a, b) {
  if (!(Number.isInteger(a) && Number.isInteger(b))) {
    throw new Error("Both parameters must be integer")
  }

  if (a === b) return [a]

  const [min, max] = [a, b].sort((a, b) => a - b)
  return new Array(max - min + 1).fill(null).map((_, idx) => min + idx)
}

export default range
