/**
 * Projects the value to a circle in the range of `min` and `max`.
 *
 * @param {number} value
 * @param {object} options
 * @param {number} options.min
 * @param {number} options.max
 */
function modulo(value, { min = 0, max }) {
  const nValue = value - min
  const nMax = max - min
  return nValue < 0 ? min + ((nMax + nValue) % nMax) : min + (nValue % nMax)
}

export default modulo
