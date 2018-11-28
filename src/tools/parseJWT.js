let b64DecodeUnicode = str => {
  try {
    return decodeURIComponent(
      Array.prototype.map.call(atob(str), c =>
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      ).join(''))
  } catch (e) {
    return null
  }
}

let parseJwt = token => {
  const [part1, part2] = token.split('.')
  if (!part1 || !part2) return null
  return JSON.parse(
    b64DecodeUnicode(
      part2.replace('-', '+').replace('_', '/')
    )
  )
}

export default parseJwt
