/**
 * Returns the minimal distance between `a` and `b` in a circular range
 *
 * @param {number} a
 * @param {number} b
 * @param {number} max - The size of the range. E.g in the range of `0...100` `max` is `100`
 * @returns {number} - The minimal distance between `a` and `b`
 */
function minDiff(a, b, max) {
  if (max <= 0) return 0
  const d1 = b - a
  const d2 = (max - Math.abs(d1)) * Math.sign(d1 * -1)
  return Math.abs(d1) < Math.abs(d2) ? d1 : d2
}

export default minDiff
