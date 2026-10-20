import curry from './curry'

const fn = curry(function (this: { x?: unknown } | undefined, a, b, c, ...rest) {
  return [a, b, c, rest, this && this.x]
})
const _ = fn.placeholder

it('invokes with all arguments at once', () => {
  expect(fn(1, 2, 3)).toEqual([1, 2, 3, [], undefined])
})

it('collects arguments across calls', () => {
  expect(fn(1)(2)(3)).toEqual([1, 2, 3, [], undefined])
  expect(fn(1, 2)(3)).toEqual([1, 2, 3, [], undefined])
  expect(fn(1)(2, 3)).toEqual([1, 2, 3, [], undefined])
  expect(fn()(1)()(2, 3)).toEqual([1, 2, 3, [], undefined])
})

it('returns a function until arity is reached', () => {
  expect(typeof fn()).toBe('function')
  expect(typeof fn(1, 2)).toBe('function')
})

it('counts explicit undefined as an argument', () => {
  expect(fn(1, 2, undefined)).toEqual([1, 2, undefined, [], undefined])
  expect(fn(1, 2)(undefined)).toEqual([1, 2, undefined, [], undefined])
})

it('passes extra arguments through', () => {
  expect(fn(1, 2, 3, 4)).toEqual([1, 2, 3, [4], undefined])
  expect(fn(1)(2, 3, 4)).toEqual([1, 2, 3, [4], undefined])
})

it('fills placeholders in order', () => {
  expect(fn(_, 2)(1, 3)).toEqual([1, 2, 3, [], undefined])
  expect(fn(_, _, 3)(1)(2)).toEqual([1, 2, 3, [], undefined])
  expect(fn(_, 2)(_, 3)(1)).toEqual([1, 2, 3, [], undefined])
  expect(fn(1, _, 3)(2)).toEqual([1, 2, 3, [], undefined])
  expect(fn(_, _, _)(1, 2, 3)).toEqual([1, 2, 3, [], undefined])
})

it('allows reusing a partial application', () => {
  const partial = fn(1)
  partial(9, 9)
  expect(partial(2, 3)).toEqual([1, 2, 3, [], undefined])
})

it('preserves this', () => {
  expect(fn.call({ x: 7 }, 1, 2, 3)).toEqual([1, 2, 3, [], 7])
  const obj = { x: 8, method: fn(1, 2) }
  expect(obj.method(3)).toEqual([1, 2, 3, [], 8])
})

it('accepts an explicit arity', () => {
  const add = curry((a, b = 0) => a + b, 2)
  expect(typeof add(1)).toBe('function')
  expect(add(1)(2)).toBe(3)
})
