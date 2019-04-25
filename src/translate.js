import React from 'react'

import useTranslation from './translation'

const Translate = ({ path }) => {
  const translate = useTranslation()
  return <React.Fragment>{translate(path)}</React.Fragment>
}

export default Translate
