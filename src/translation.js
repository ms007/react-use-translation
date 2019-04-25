/* eslint-disable no-new-func */

import React, { useContext } from 'react'
import get from 'lodash/get'
import curry from 'lodash/curry'

import { TranslationsContext } from './TranslationsProvider'

const expression = /\${.+?}/
const isTemplated = text => expression.test(text)

const template = (text, values) => {
  const keys = Object.keys(values)
  var fn = new Function(...keys, 'return `' + text + '`;')
  return fn(...Object.values(values))
}

const translate = curry((translations, path, values) => {
  if (!translations) {
    throw new Error('No translations provided')
  }

  const text = get(translations, path) || path
  if (!values || !isTemplated(text)) {
    return text
  }

  return template(text, values)
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

export const useUpdateTranslation = () => {
  const { updateTranslations } = useContext(TranslationsContext)
  return updateTranslations
}

export default useTranslation
