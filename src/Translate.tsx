import React, { type ReactElement } from 'react'

import useTranslation, { type TranslationValues } from './translation'

export type TranslateProps = { path: string } & TranslationValues

const Translate = React.memo(({ path, ...props }: TranslateProps): ReactElement => {
  const text = useTranslation(path, props)
  return <React.Fragment>{text}</React.Fragment>
})

export default Translate
