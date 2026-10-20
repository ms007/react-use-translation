// Mirrors lodash/get, including bracket notation and quoted keys
const rePropName =
  /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g
const reEscapeChar = /\\(\\)?/g
const reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/
const reIsPlainProp = /^\w*$/

const isKey = (value, object) => {
  if (Array.isArray(value)) {
    return false
  }
  const type = typeof value
  if (type === 'number' || type === 'symbol' || type === 'boolean' || value == null) {
    return true
  }
  return (
    reIsPlainProp.test(value) ||
    !reIsDeepProp.test(value) ||
    (object != null && value in Object(object))
  )
}

const stringToPath = string => {
  const result = []
  if (string.charAt(0) === '.') {
    result.push('')
  }
  string.replace(rePropName, (match, number, quote, subString) => {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : number || match)
  })
  return result
}

const castPath = (value, object) => {
  if (Array.isArray(value)) {
    return value
  }
  return isKey(value, object) ? [value] : stringToPath(String(value))
}

const toKey = value => {
  if (typeof value === 'string' || typeof value === 'symbol') {
    return value
  }
  const result = `${value}`
  return result === '0' && 1 / value === -Infinity ? '-0' : result
}

const get = (object, path, defaultValue) => {
  let result
  if (object != null) {
    const keys = castPath(path, object)
    let index = 0
    let current = object
    while (current != null && index < keys.length) {
      current = current[toKey(keys[index++])]
    }
    result = index && index === keys.length ? current : undefined
  }
  return result === undefined ? defaultValue : result
}

export default get
