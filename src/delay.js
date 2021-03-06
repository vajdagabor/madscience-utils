/**
 * Returns the result of the passed function after a delay,
 * making the perception that an operation took longer.
 *
 * @param {function} fn - The function to delay
 * @param {number} delayUntil - Minimum return time, specified as number of milliseconds elapsed since January 1, 1970 00:00:00 UTC
 *
 * @example
 *
 * // Submit form data, and process the results at least 1500 milliseconds later
 * const data = delay(submitForm, Date.now() + 1500)
 * process(data)
 */
async function delay(fn, delayUntil = Date.now() + 1000) {
  const waitTillTheEnd = async () => {
    const remainingTime = delayUntil - Date.now()
    if (remainingTime > 0) {
      await new Promise(resolve => setTimeout(resolve, remainingTime))
    }
  }

  try {
    const result = await fn()
    await waitTillTheEnd()
    return result
  } catch (error) {
    await waitTillTheEnd()
    return Promise.reject(error)
  }
}

export default delay
