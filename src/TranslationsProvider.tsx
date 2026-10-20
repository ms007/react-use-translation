import React, { useCallback, useMemo, useState, type ReactElement, type ReactNode } from 'react'

export interface Translations {
  language?: string
  [key: string]: unknown
}

export interface TranslationsContextValue {
  translations?: Translations
  updateTranslations?: (translations: Translations) => void
}

export const TranslationsContext = React.createContext<TranslationsContextValue>({})

export interface TranslationsProviderProps {
  translations?: Translations
  children?: ReactNode
}

interface TranslationsState {
  translations: Translations
  // language of the translations prop, or the prop itself without a language
  prev: string | Translations
}

// Stable default, a new object per render would reset the state on every render
const noTranslations: Translations = {}

const fromProp = (translations: Translations): TranslationsState => ({
  translations,
  prev: translations.language || translations
})

const TranslationsProvider = ({
  translations = noTranslations,
  children
}: TranslationsProviderProps): ReactElement => {
  const [state, setState] = useState(() => fromProp(translations))

  // Adopt the prop only when its language changes, or its identity without a language,
  // so translations set through updateTranslations survive unrelated re-renders
  const { language } = translations
  if (translations !== state.prev && language !== state.prev) {
    setState(fromProp(translations))
  }

  const updateTranslations = useCallback((next: Translations) => {
    setState(current => ({ ...current, translations: next }))
  }, [])

  const value = useMemo(
    () => ({ translations: state.translations, updateTranslations }),
    [state.translations, updateTranslations]
  )
  return <TranslationsContext.Provider value={value}>{children}</TranslationsContext.Provider>
}

export default TranslationsProvider
