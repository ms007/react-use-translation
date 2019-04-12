import React, { useContext } from 'react'
import get from 'lodash/get'
import curry from 'lodash/curry'

import { TranslationsContext } from './TranslationsProvider'

const translate = curry((translations, path) => {
  if (!translations) {
    throw new Error('No translations provided')
  }

  return get(translations, path) || path
})

export const withTranslation = Component => {
  const enhancedComponent = props => {
    const { translations } = useContext(TranslationsContext)
    return (
      <Component {...props} translate={(path, values) => translate(translations, path, values)} />
    )
  }

  enhancedComponent.displayName = `withTranslation(${Component.displayName || Component.name})`
  enhancedComponent.WrappedComponent = Component
  return enhancedComponent
}

export const useTranslation = (path, values) => {
  const { translations } = useContext(TranslationsContext)
  return translate(translations, path, values)
}

export default useTranslation
