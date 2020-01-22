/**
 * Associates an array of values with an array of keys
 *
 * @param {Array} values
 * @param {Array|string} keys
 * @return {Object}
 */
function objectFromArray(values = [], keys = []) {
  return [...keys].reduce(
    (result, key, i) => ({ ...result, [key]: values[i] }),
    {}
  )
}

export default objectFromArray
