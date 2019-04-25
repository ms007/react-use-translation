import React from 'react'

import useTranslation from './translation'

const Translate = ({ path }) => {
  const text = useTranslation(path)
  return <React.Fragment>{text}</React.Fragment>
}

export default Translate
