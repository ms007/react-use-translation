/* eslint-disable no-new-func */

// Based on lodash/template for ES delimiters (${...}) only.
// Compiles to string concatenation instead of a native template literal,
// which older engines like IE11 cannot parse.
// Unlike lodash, a placeholder that fails to evaluate stays in the output as is.
const reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g
const reUnescapedString = /['\n\r\u2028\u2029\\]/g

const stringEscapes = {
  '\\': '\\',
  "'": "'",
  '\n': 'n',
  '\r': 'r',
  '\u2028': 'u2028',
  '\u2029': 'u2029'
}

const escapeStringChar = chr => '\\' + stringEscapes[chr]
const escapeString = string => string.replace(reUnescapedString, escapeStringChar)

const warn = (message, error) => {
  if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
    console.warn(`react-use-translation: ${message}`, error)
  }
}

const compile = text => {
  let index = 0
  let source = ''

  text.replace(reEsTemplate, (match, expression, offset) => {
    source += "__p += '" + escapeString(text.slice(index, offset)) + "';\n"
    if (expression) {
      const placeholder = escapeString(match)
      // prettier-ignore
      source +=
        'try {\n__t = (' + expression + ");\n__p += __t == null ? '' : __t;\n" +
        "} catch (e) {\n__w('could not evaluate " + placeholder + "', e);\n" +
        "__p += '" + placeholder + "';\n}\n"
    }
    index = offset + match.length
    return match
  })
  source += "__p += '" + escapeString(text.slice(index)) + "';\n"

  return new Function(
    '__w',
    "return function (obj) {\nobj || (obj = {});\nvar __t, __p = '';\nwith (obj) {\n" +
      source +
      '}\nreturn __p\n}'
  )(warn)
}

const cache = new Map()

const template = text => {
  const string = text == null ? '' : String(text)
  let compiled = cache.get(string)
  if (!compiled) {
    try {
      compiled = compile(string)
    } catch (error) {
      // Not cached, so a broken translation warns on every render
      warn(`could not compile "${string}"`, error)
      return () => string
    }
    cache.set(string, compiled)
  }
  return compiled
}

export default template
