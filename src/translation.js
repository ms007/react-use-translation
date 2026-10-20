import React, { useContext } from 'react'
import get from './get'
import curry from './curry'
import template from './template'

import { TranslationsContext } from './TranslationsProvider'

const expression = /\${.+?}/
const isTemplated = text => expression.test(text)

export const translate = curry((translations, path, values) => {
  if (!translations) {
    throw new Error('No translations provided')
  }

  const text = get(translations, path) || path
  if (!values || !isTemplated(text)) {
    return text
  }

  return template(text)(values)
})

export const withTranslation = Component => {
  const EnhancedComponent = props => {
    const { translations } = useContext(TranslationsContext)
    return (
      <Component {...props} translate={(path, values) => translate(translations, path, values)} />
    )
  }

  EnhancedComponent.displayName = `withTranslation(${Component.displayName || Component.name})`
  EnhancedComponent.WrappedComponent = Component
  return EnhancedComponent
}

export const useTranslation = (path, values) => {
  const { translations } = useContext(TranslationsContext)
  return translate(translations, path, values)
}

export const useUpdateTranslation = () => {
  const { updateTranslations } = useContext(TranslationsContext)
  return updateTranslations
}

export default useTranslation
