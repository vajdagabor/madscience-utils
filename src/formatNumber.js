/**
 * Format a number to a given number of decimal places
 *
 * @param {number} value - The number value that needs to be formatted
 * @param {number} precision - Number of decimal places in the output
 * @param {boolean} trimZeros - Should trailing zeros be removed
 * @return {string}
 */
function formatNumber(value, precision = 2, trimZeros = false) {
  let result = value.toFixed(precision)
  if (trimZeros) result = result.replace(/(?:\.0+$|(\..+?)0+)$/, "$1")
  return result
}

export default formatNumber
