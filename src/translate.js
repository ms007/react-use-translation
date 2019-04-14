import React from 'react'

import useTranslation from './translation'

const Translate = ({ path, ...props }) => {
  const text = useTranslation(path, props)
  return <span {...props}>{text}</span>
}

export default Translate
