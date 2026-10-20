import React, { useEffect } from 'react'
import TranslationsProvider, { type Translations } from './TranslationsProvider'
import { useTranslation, useUpdateTranslation } from './translation'
import { render, act } from './test-utils'

let update: (translations: Translations) => void
const Title = () => {
  const updateTranslations = useUpdateTranslation()
  useEffect(() => {
    update = updateTranslations!
  })
  return useTranslation('title')
}

const renderProvider = (translations: Translations) =>
  render(
    <TranslationsProvider translations={translations}>
      <Title />
    </TranslationsProvider>
  )

it('provides the translations', () => {
  const { container } = renderProvider({ title: 'Hello' })
  expect(container.textContent).toBe('Hello')
})

it('provides an empty object without translations prop', () => {
  const { container } = render(
    <TranslationsProvider>
      <Title />
    </TranslationsProvider>
  )
  expect(container.textContent).toBe('title')
})

describe('without language', () => {
  it('replaces translations when the object changes', () => {
    const { container, rerender } = renderProvider({ title: 'Hello' })
    rerender(
      <TranslationsProvider translations={{ title: 'Hallo' }}>
        <Title />
      </TranslationsProvider>
    )
    expect(container.textContent).toBe('Hallo')
  })

  it('keeps updated translations while the object stays the same', () => {
    const translations = { title: 'Hello' }
    const { container, rerender } = renderProvider(translations)
    act(() => {
      update({ title: 'Updated' })
    })
    rerender(
      <TranslationsProvider translations={translations}>
        <Title />
      </TranslationsProvider>
    )
    expect(container.textContent).toBe('Updated')
  })
})

describe('with language', () => {
  it('keeps translations while the language stays the same', () => {
    const { container, rerender } = renderProvider({
      language: 'en',
      title: 'Hello'
    })
    rerender(
      <TranslationsProvider translations={{ language: 'en', title: 'Changed' }}>
        <Title />
      </TranslationsProvider>
    )
    expect(container.textContent).toBe('Hello')
  })

  it('keeps updated translations while the language stays the same', () => {
    const { container, rerender } = renderProvider({
      language: 'en',
      title: 'Hello'
    })
    act(() => {
      update({ language: 'en', title: 'Updated' })
    })
    rerender(
      <TranslationsProvider translations={{ language: 'en', title: 'Hello' }}>
        <Title />
      </TranslationsProvider>
    )
    expect(container.textContent).toBe('Updated')
  })

  it('replaces translations when the language changes', () => {
    const { container, rerender } = renderProvider({
      language: 'en',
      title: 'Hello'
    })
    act(() => {
      update({ language: 'en', title: 'Updated' })
    })
    rerender(
      <TranslationsProvider translations={{ language: 'de', title: 'Hallo' }}>
        <Title />
      </TranslationsProvider>
    )
    expect(container.textContent).toBe('Hallo')
  })
})
