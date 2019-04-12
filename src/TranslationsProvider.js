import React, { Component } from 'react'

export const TranslationsContext = React.createContext({})

class TranslationsProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      translations: props.translations
    }
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
