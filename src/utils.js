/**
 * Format a number to a given number of decimal places
 *
 * @param {number} value - The number value that needs to be formatted
 * @param {number} precision - Number of decimal places in the output
 * @param {boolean} trimZeros - Should trailing zeros be removed
 * @return {string}
 */
export function formatNumber(value, precision = 2, trimZeros = false) {
  let result = value.toFixed(precision)
  if (trimZeros) result = result.replace(/(?:\.0+$|(\..+?)0+)$/, "$1")
  return result
}

/**
 * Capitalize a string
 *
 * @param {string} s - The string to capitalize
 * @return {string}
 */
export function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

/**
 * Checks if value is a number
 *
 * @param {any} v
 * @return {boolean}
 */
export function isNumber(v) {
  return typeof v == "number"
}

/**
 * Return the first number element from the passed array
 *
 * @param {Array} values – The array of values to find the first number in
 * @param {any} fallback - The default value
 */
export function firstNumber([...values], fallback = null) {
  const value = values.find(value => typeof value == "number")
  return value == undefined ? fallback : value
}

/**
 * Associates an array of values with an array of keys
 *
 * @param {Array} values
 * @param {Array} keys
 * @return {Object}
 */
export function objectFromArray(values = [], keys = []) {
  return [...keys].reduce(
    (result, key, i) => ({ ...result, [key]: values[i] }),
    {}
  )
}

export function minDiff(min, max, edge) {
  if (edge <= 0) return 0
  const d1 = max - min
  const d2 = (edge - Math.abs(d1)) * Math.sign(d1 * -1)
  return Math.abs(d1) < Math.abs(d2) ? d1 : d2
}

export function lerp(min = 0, max = 0, steps = 0) {
  const positiveSteps = steps < 0 ? 0 : steps
  const step = (max - min) / (positiveSteps + 1)
  const transRegion = Array(positiveSteps)
    .fill(undefined)
    .map((_, i) => min + step * (i + 1))
  return [min, ...transRegion, max]
}

export function loopLerp(min = 0, max = 0, steps = 0, edge = 0) {
  const positiveSteps = steps < 0 ? 0 : steps
  const diff = minDiff(min, max, edge)
  const stepSize = diff / (positiveSteps + 1)
  const transRegion = Array(positiveSteps)
    .fill(undefined)
    .map((_, i) => {
      let step = (min + stepSize * (i + 1)) % edge
      return step < 0 ? edge + step : step
    })
  return [min, ...transRegion, max]
}

export function clamp(
  value,
  { min = null, max = null, circular = false } = {}
) {
  let v = value
  v = isNumber(min) ? Math.max(v, min) : v
  v = isNumber(max) ? Math.min(v, max) : v

  if (circular && typeof min === "number" && typeof max === "number") {
    const diff = value % max
    v = diff < 0 ? max + diff : diff
  }

  return v
}

export const defaultTo = (...values) => {
  for (let value of values) {
    if (value != null && !Number.isNaN(value)) return value
  }
  return values[0]
}

export function seriesFromTemplate(template = [], edge = null) {
  if (!Array.isArray(template))
    throw new Error(
      `Template for seriesFromTemplate() should be an array, but got ${typeof template}.`
    )

  if (template.length === 0) return []

  if (
    typeof template[0] !== "number" ||
    typeof template[template.length - 1] !== "number"
  )
    throw new Error(
      "First and last item of the template of seriesFromTemplate() should be a number."
    )

  const min = template[0]
  const maxIndex = template.slice(1).findIndex(n => typeof n === "number") + 1
  const max = template[maxIndex]
  let calculatedRegion =
    typeof edge === "number"
      ? loopLerp(min, max, maxIndex - 1, edge).slice(1, -1)
      : lerp(min, max, maxIndex - 1).slice(1, -1)

  if (maxIndex !== template.length - 1) {
    const nextSlice = template.slice(maxIndex)
    calculatedRegion = [
      ...calculatedRegion,
      max,
      ...seriesFromTemplate(nextSlice, edge).slice(1, -1),
    ]
  }

  return [min, ...calculatedRegion, template[template.length - 1]]
}
