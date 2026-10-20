import React, { Component, type ReactElement, type ReactNode } from 'react'

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

interface TranslationsProviderState {
  translations?: Translations
  prev?: string | Translations
}

class TranslationsProvider extends Component<TranslationsProviderProps, TranslationsProviderState> {
  state: TranslationsProviderState = {}

  static getDerivedStateFromProps(
    nextProps: TranslationsProviderProps,
    prevState: TranslationsProviderState
  ): TranslationsProviderState | null {
    const { translations = {} } = nextProps
    const { prev } = prevState
    const { language } = translations
    const translationsChanged = translations !== prev && language !== prev
    if (prev == null || translationsChanged) {
      return {
        translations,
        prev: language || translations
      }
    }

    return null
  }

  update = (translations: Translations) => {
    this.setState({ ...this.state, translations })
  }

  render(): ReactElement {
    const { children } = this.props
    const { translations } = this.state

    const value = { translations, updateTranslations: this.update }
    return <TranslationsContext.Provider value={value}>{children}</TranslationsContext.Provider>
  }
}

export default TranslationsProvider
