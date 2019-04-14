import React, { Component } from 'react'

export const TranslationsContext = React.createContext({})

class TranslationsProvider extends Component {
  state = {}

  static getDerivedStateFromProps(nextProps, prevState) {
    const { translations = {} } = nextProps
    const { prev } = prevState
    const { language } = translations
    const translationsChanged = translations !== prev && language !== prev
    if (prev == null || translationsChanged) {
      return {
        translations: translations,
        prev: language || translations
      }
    }

    return null
  }

  update = translations => {
    this.setState({ ...this.state, translations })
  }

  render() {
    const { children } = this.props
    const { translations } = this.state

    const value = { translations, updateTranslations: this.update }
    return <TranslationsContext.Provider value={value}>{children}</TranslationsContext.Provider>
  }
}

export default TranslationsProvider
