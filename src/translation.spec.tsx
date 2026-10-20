/* eslint-disable no-template-curly-in-string */
import React from 'react'
import TranslationsProvider, { type Translations } from './TranslationsProvider'
import {
  translate,
  useTranslation,
  useUpdateTranslation,
  withTranslation,
  type TranslationValues,
  type WithTranslationProps
} from './translation'
import { render, act } from './test-utils'

const translations = {
  title: 'Hello world!',
  greeting: 'Hello ${name}!',
  nested: { label: 'Nested' }
}

describe('translate', () => {
  it('translates without template string', () => {
    expect(translate(translations, 'title', null)).toBe('Hello world!')
  })

  it('translates with template string', () => {
    expect(translate(translations, 'greeting', { name: 'Larry' })).toBe('Hello Larry!')
  })

  it('resolves nested paths', () => {
    expect(translate(translations, 'nested.label', null)).toBe('Nested')
  })

  it('falls back to the path for missing translations', () => {
    expect(translate(translations, 'missing.path', null)).toBe('missing.path')
  })

  it('returns templated text unchanged without values', () => {
    expect(translate(translations, 'greeting', null)).toBe('Hello ${name}!')
    expect(translate(translations, 'greeting', undefined)).toBe('Hello ${name}!')
  })

  it('ignores values for plain text', () => {
    expect(translate(translations, 'title', { name: 'Larry' })).toBe('Hello world!')
  })

  it('throws without translations', () => {
    expect(() => translate(undefined, 'title', null)).toThrow('No translations provided')
    expect(() => translate(null, 'title', null)).toThrow('No translations provided')
  })

  it('is curried', () => {
    expect(translate(translations)('greeting')({ name: 'Larry' })).toBe('Hello Larry!')
    expect(translate(translations, 'title')(null)).toBe('Hello world!')
  })
})

describe('useTranslation', () => {
  const Text = ({ path, values }: { path: string; values?: TranslationValues }) =>
    useTranslation(path, values)

  it('translates from the provider', () => {
    const { container } = render(
      <TranslationsProvider translations={translations}>
        <Text path="greeting" values={{ name: 'Larry' }} />
      </TranslationsProvider>
    )
    expect(container.textContent).toBe('Hello Larry!')
  })

  it('throws outside of a provider', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<Text path="title" />)).toThrow('No translations provided')
    error.mockRestore()
  })
})

describe('useUpdateTranslation', () => {
  it('replaces the translations of the provider', () => {
    let update: (translations: Translations) => void = () => {}
    const Updater = () => {
      update = useUpdateTranslation()
      return useTranslation('title')
    }

    const { container } = render(
      <TranslationsProvider translations={translations}>
        <Updater />
      </TranslationsProvider>
    )
    expect(container.textContent).toBe('Hello world!')

    act(() => {
      update({ title: 'Hallo Welt!' })
    })
    expect(container.textContent).toBe('Hallo Welt!')
  })

  it('throws outside of a provider', () => {
    const Updater = () => {
      useUpdateTranslation()
      return null
    }
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<Updater />)).toThrow(
      'useUpdateTranslation must be used within a TranslationsProvider'
    )
    error.mockRestore()
  })
})

describe('withTranslation', () => {
  function Greeting({ translate, name }: WithTranslationProps & { name: string }) {
    return translate('greeting', { name })
  }
  const Enhanced = withTranslation(Greeting)

  it('passes a translate prop bound to the provider', () => {
    const { container } = render(
      <TranslationsProvider translations={translations}>
        <Enhanced name="Larry" />
      </TranslationsProvider>
    )
    expect(container.textContent).toBe('Hello Larry!')
  })

  it('exposes displayName and the wrapped component', () => {
    expect(Enhanced.displayName).toBe('withTranslation(Greeting)')
    expect(Enhanced.WrappedComponent).toBe(Greeting)

    const Named = () => null
    Named.displayName = 'Custom'
    expect(withTranslation(Named).displayName).toBe('withTranslation(Custom)')
  })
})
