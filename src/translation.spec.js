import { translate } from './translation'

it('translates without template string', () => {
  const translations = {
    title: 'Hello world!'
  }

  const translated = translate(translations, 'title', null)
  expect(translated).toBe('Hello world!')
})

it('translates with template string', () => {
  const translations = {
    title: 'Hello ${name}!' // eslint-disable-line
  }

  const translated = translate(translations, 'title', { name: 'Larry' })
  expect(translated).toBe('Hello Larry!')
})
