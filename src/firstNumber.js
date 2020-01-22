/**
 * Returns the first number element from the passed array
 *
 * @param {Array} values – The array of values to find the first number in
 * @param {any} fallback - The default value
 */
function firstNumber([...values], fallback = null) {
  const value = values.find(value => typeof value == "number")
  return value == undefined ? fallback : value
}

export default firstNumber
