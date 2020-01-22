import lerp from "./lerp"
import loopLerp from "./loopLerp"

/**
 * Applies linear interpolation to the `null` values of the input array.
 * When an `edge` parameter is provided, the interpolation is done
 * with the `looplerp()` function.
 *
 * @param {number[]} template - The input array that contains numbers as fix values, and `null` fields to be filled during the interpolation process
 * @param {number=} edge - An upper limit for the values in the output array.
 */
function lerpArray(template = [], edge) {
  if (!Array.isArray(template))
    throw new Error(
      `Template for lerpArray() should be an array, but got ${typeof template}.`
    )

  if (template.length === 0) return []

  if (
    typeof template[0] !== "number" ||
    typeof template[template.length - 1] !== "number"
  )
    throw new Error(
      "First and last item of the template of lerpArray() should be a number."
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
      ...lerpArray(nextSlice, edge).slice(1, -1),
    ]
  }

  return [min, ...calculatedRegion, template[template.length - 1]]
}

export default lerpArray
