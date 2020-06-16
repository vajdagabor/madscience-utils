export default async function measure(fn) {
  const startTime = Date.now()
  await fn()
  const endTime = Date.now()

  return endTime - startTime
}
