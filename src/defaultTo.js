/**
 * Returns the first value that is not `undefined`, `null` or `NaN`
 *
 * @param {...any} values
 */
const defaultTo = (...values) => {
  for (let value of values) {
    if (value != null && !Number.isNaN(value)) return value
  }
  return values[0]
}

export default defaultTo
