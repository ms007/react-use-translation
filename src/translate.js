import React from 'react'

import useTranslation from './translation'

const Translate = ({ path, ...props }) => {
  const text = useTranslation(path, props)
  return <React.Fragment>{text}</React.Fragment>
}

export default Translate
