export default function isReady(...arr) {
  let ready = true
  arr.forEach(i => {
    if (!i) {
      ready = false
    }
  })

  return ready
}
