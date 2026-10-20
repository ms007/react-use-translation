// Mirrors lodash/get, including bracket notation and quoted keys
const rePropName =
  /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g
const reEscapeChar = /\\(\\)?/g
const reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/
const reIsPlainProp = /^\w*$/

export type Path = PropertyKey | readonly PropertyKey[] | null | undefined

const isKey = (value: unknown, object: unknown): boolean => {
  if (Array.isArray(value)) {
    return false
  }
  const type = typeof value
  if (type === 'number' || type === 'symbol' || type === 'boolean' || value == null) {
    return true
  }
  return (
    reIsPlainProp.test(value as string) ||
    !reIsDeepProp.test(value as string) ||
    (object != null && (value as PropertyKey) in Object(object))
  )
}

const stringToPath = (string: string): string[] => {
  const result: string[] = []
  if (string.charAt(0) === '.') {
    result.push('')
  }
  string.replace(rePropName, (match, number, quote, subString) => {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : number || match)
    return match
  })
  return result
}

const castPath = (value: Path, object: unknown): readonly unknown[] => {
  if (Array.isArray(value)) {
    return value
  }
  return isKey(value, object) ? [value] : stringToPath(String(value))
}

const toKey = (value: unknown): PropertyKey => {
  if (typeof value === 'string' || typeof value === 'symbol') {
    return value
  }
  const result = `${value}`
  return result === '0' && 1 / (value as number) === -Infinity ? '-0' : result
}

const get = (object: unknown, path: Path, defaultValue?: unknown): unknown => {
  let result: unknown
  if (object != null) {
    const keys = castPath(path, object)
    let index = 0
    let current: unknown = object
    while (current != null && index < keys.length) {
      current = (current as Record<PropertyKey, unknown>)[toKey(keys[index++])]
    }
    result = index && index === keys.length ? current : undefined
  }
  return result === undefined ? defaultValue : result
}

export default get
