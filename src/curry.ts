// Mirrors lodash/curry, including placeholder support
// Typed loosely; callers describe the curried signature themselves
const placeholder = {}

type AnyFunction = (...args: any[]) => any

export interface Curried {
  (...args: any[]): any
  placeholder: typeof placeholder
}

const curry = (fn: AnyFunction, arity: number = fn.length): Curried => {
  const wrap = (collected: unknown[]): Curried => {
    const curried = function (this: unknown, ...args: unknown[]) {
      const merged: unknown[] = []
      let i = 0
      for (let j = 0; j < collected.length; j++) {
        const arg = collected[j]
        merged.push(arg === placeholder && i < args.length ? args[i++] : arg)
      }
      while (i < args.length) merged.push(args[i++])

      const filled = merged.filter(arg => arg !== placeholder).length
      return filled < arity ? wrap(merged) : fn.apply(this, merged)
    }
    curried.placeholder = placeholder
    return curried
  }
  return wrap([])
}

curry.placeholder = placeholder

export default curry
