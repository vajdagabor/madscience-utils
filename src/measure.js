export default async function measure(fn, canFail = false) {
  const startTime = Date.now()

  if (canFail) {
    try {
      await fn()
    } catch (error) {
      void 0
    }
  } else {
    await fn()
  }
  const endTime = Date.now()

  return endTime - startTime
}
