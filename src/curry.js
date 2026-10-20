// Mirrors lodash/curry, including placeholder support
const placeholder = {}

const curry = (fn, arity = fn.length) => {
  const wrap = collected => {
    const curried = function (...args) {
      const merged = []
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
