/**
 * Returns a subset of an object, where the keys match the elements of the
 * passed array
 */
function pick(object, keys) {
  return keys.reduce((result, key) => ({ [key]: object[key], ...result }), {})
}

export default pick
