import React from 'react'

import useTranslation from './useTranslation'

const Translate = ({ path, ...props }) => {
  const text = useTranslation(path, props)

  return <span {...props}>{text}</span>
}

export default Translate
