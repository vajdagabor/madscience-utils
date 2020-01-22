/**
 * Capitalize a string
 *
 * @param {string} s - The string to capitalize
 * @return {string}
 */
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default capitalize
