import get from './get'

const object = {
  a: { b: { c: 3 }, 'b.c': 'dotted', n: null, z: 0 },
  list: [{ name: 'x' }, { name: 'y' }],
  "q'k": { v: 1 },
  '-0': 'negative zero'
}

it('resolves dot paths', () => {
  expect(get(object, 'a.b.c')).toBe(3)
  expect(get(object, 'a.b')).toEqual({ c: 3 })
})

it('resolves array paths', () => {
  expect(get(object, ['a', 'b', 'c'])).toBe(3)
  expect(get({ 'a.b': 'flat' }, ['a.b'])).toBe('flat')
})

it('prefers a direct key containing a dot', () => {
  const flat = { a: { b: 'nested' }, 'a.b': 'flat' }
  expect(get(flat, 'a.b')).toBe('flat')
  expect(get(flat, ['a', 'b'])).toBe('nested')
})

it('resolves bracket notation', () => {
  expect(get(object, 'list[0].name')).toBe('x')
  expect(get(object, 'list.1.name')).toBe('y')
  expect(get(object, 'list[1]["name"]')).toBe('y')
  expect(get(object, 'a["b.c"]')).toBe('dotted')
  expect(get(object, '["q\'k"].v')).toBe(1)
})

it('returns undefined for missing paths', () => {
  expect(get(object, 'a.x.y')).toBeUndefined()
  expect(get(object, 'a.n.x')).toBeUndefined()
  expect(get(null, 'a')).toBeUndefined()
  expect(get(undefined, 'a')).toBeUndefined()
  expect(get(object, [])).toBeUndefined()
})

it('returns the default value only for undefined results', () => {
  expect(get(object, 'a.x', 'default')).toBe('default')
  expect(get(null, 'a', 'default')).toBe('default')
  expect(get(object, 'a.n', 'default')).toBeNull()
  expect(get(object, 'a.z', 'default')).toBe(0)
})

it('handles non-string keys', () => {
  expect(get(object, -0)).toBe('negative zero')
  expect(get(['first'], 0)).toBe('first')
  expect(get('str', 'length')).toBe(3)
})
