import React, { useContext, type ComponentType, type ReactElement } from 'react'
import get from './get'
import curry from './curry'
import template from './template'

import { TranslationsContext, type Translations } from './TranslationsProvider'

export type TranslationValues = Record<string, unknown>

type Values = TranslationValues | null | undefined
type MaybeTranslations = Translations | null | undefined

interface CurriedTranslate {
  (translations: MaybeTranslations, path: string, values: Values): string
  (translations: MaybeTranslations, path: string): (values: Values) => string
  (translations: MaybeTranslations): {
    (path: string, values: Values): string
    (path: string): (values: Values) => string
  }
}

const expression = /\${.+?}/
const isTemplated = (text: string) => expression.test(text)

export const translate: CurriedTranslate = curry(
  (translations: MaybeTranslations, path: string, values: Values): string => {
    if (!translations) {
      throw new Error('No translations provided')
    }

    const text = (get(translations, path) as string | undefined) || path
    if (!values || !isTemplated(text)) {
      return text
    }

    return template(text)(values)
  }
)

export interface WithTranslationProps {
  translate: (path: string, values?: Values) => string
}

export const withTranslation = <P extends WithTranslationProps>(Component: ComponentType<P>) => {
  const EnhancedComponent = (props: Omit<P, keyof WithTranslationProps>): ReactElement => {
    const { translations } = useContext(TranslationsContext)
    return (
      <Component
        {...(props as P)}
        translate={(path: string, values?: Values) => translate(translations, path, values)}
      />
    )
  }

  EnhancedComponent.displayName = `withTranslation(${Component.displayName || Component.name})`
  EnhancedComponent.WrappedComponent = Component
  return EnhancedComponent
}

export const useTranslation = (path: string, values?: Values): string => {
  const { translations } = useContext(TranslationsContext)
  return translate(translations, path, values)
}

export const useUpdateTranslation = () => {
  const { updateTranslations } = useContext(TranslationsContext)
  return updateTranslations
}

export default useTranslation
