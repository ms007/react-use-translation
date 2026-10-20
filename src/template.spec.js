/* eslint-disable no-template-curly-in-string */
import template from './template'

const render = (text, values) => template(text)(values)

it('interpolates values', () => {
  expect(render('Hello ${name}!', { name: 'Larry' })).toBe('Hello Larry!')
  expect(render('${name}${name}', { name: 'a' })).toBe('aa')
  expect(render('${a.b}', { a: { b: 1 } })).toBe('1')
})

it('evaluates expressions', () => {
  expect(render('${count} day${count > 1 ? "s" : ""}', { count: 1 })).toBe(
    '1 day'
  )
  expect(render('${count} day${count > 1 ? "s" : ""}', { count: 3 })).toBe(
    '3 days'
  )
  expect(render('${name.toUpperCase()}', { name: 'larry' })).toBe('LARRY')
  expect(
    render('${list.map(i => i.name).join(", ")}', {
      list: [{ name: 'a' }, { name: 'b' }]
    })
  ).toBe('a, b')
  expect(render('${Math.round(price)}', { price: 2.6 })).toBe('3')
})

it('renders null and undefined as empty string', () => {
  expect(render('[${value}]', { value: null })).toBe('[]')
  expect(render('[${value}]', { value: undefined })).toBe('[]')
  expect(render('[${value}]', { value: 0 })).toBe('[0]')
  expect(render('[${value}]', { value: false })).toBe('[false]')
})

describe('failing placeholders', () => {
  let warn

  beforeEach(() => {
    warn = jest.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    warn.mockRestore()
  })

  it('keeps placeholders with missing values', () => {
    expect(render('Hello ${missingValue}', {})).toBe('Hello ${missingValue}')
    expect(render('Hello ${missingValue}', null)).toBe('Hello ${missingValue}')
  })

  it('renders the other placeholders', () => {
    expect(render('${missingValue}, ${count} new', { count: 3 })).toBe(
      '${missingValue}, 3 new'
    )
  })

  it('keeps placeholders that throw', () => {
    expect(render('${user.name.toUpperCase()}!', { user: {} })).toBe(
      '${user.name.toUpperCase()}!'
    )
    expect(render("${'it\\'s ' + missingValue}", {})).toBe(
      "${'it\\'s ' + missingValue}"
    )
  })

  it('warns for each failing placeholder', () => {
    render('${missingValue} ${otherValue}', {})
    expect(warn).toHaveBeenCalledTimes(2)
    expect(warn.mock.calls[0][0]).toContain('${missingValue}')
    expect(warn.mock.calls[0][1]).toBeInstanceOf(ReferenceError)
  })

  it('keeps the whole text for invalid expressions', () => {
    expect(render('${1 +} and ${count}', { count: 1 })).toBe(
      '${1 +} and ${count}'
    )
    expect(warn.mock.calls[0][1]).toBeInstanceOf(SyntaxError)
  })

  it('does not cache invalid expressions', () => {
    template('Broken ${1 +}')
    template('Broken ${1 +}')
    expect(warn).toHaveBeenCalledTimes(2)
    expect(template('Broken ${1 +}')).not.toBe(template('Broken ${1 +}'))
  })
})

it('keeps special characters in the text', () => {
  const separators = String.fromCharCode(0x2028) + String.fromCharCode(0x2029)
  expect(render("it's ${name}", { name: 'x' })).toBe("it's x")
  expect(render('back\\slash ${name}', { name: 'x' })).toBe('back\\slash x')
  expect(render('line\nbreak\r${name}', { name: 'x' })).toBe('line\nbreak\rx')
  expect(render(separators + '${name}', { name: 'x' })).toBe(separators + 'x')
})

it('drops empty placeholders', () => {
  expect(render('a${}b', {})).toBe('ab')
})

it('leaves lodash delimiters untouched', () => {
  expect(render('<%= name %> ${name}', { name: 'x' })).toBe('<%= name %> x')
  expect(render('<% if (true) { %>x<% } %>', {})).toBe(
    '<% if (true) { %>x<% } %>'
  )
  expect(render('<%- html %>', { html: '<b>' })).toBe('<%- html %>')
})

it('reuses compiled templates', () => {
  expect(template('Cached ${name}')).toBe(template('Cached ${name}'))
})
