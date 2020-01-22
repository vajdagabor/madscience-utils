import isNumber from "./isNumber"

/**
 * Forces a value between `min` and `max`, so that if the input value is smaller
 * than `min`, then the function returns `min`, and if value is larger than
 * `max`, it returns `max`.
 *
 * @param {number} value
 * @param {object} options
 * @param {number} [options.min]
 * @param {number} [options.max]
 */
function clamp(value, { min, max } = {}) {
  let v = value
  if (isNumber(min)) v = Math.max(v, min)
  if (isNumber(max)) v = Math.min(v, max)
  return v
}

export default clamp
