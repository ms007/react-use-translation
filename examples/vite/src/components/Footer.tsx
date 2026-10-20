import { Component } from 'react'
import { withTranslation, type WithTranslationProps } from 'react-use-translation'

class Footer extends Component<WithTranslationProps> {
  render() {
    return (
      <footer>
        <small>{this.props.translate('footer')}</small>
      </footer>
    )
  }
}

const TranslatedFooter = withTranslation(Footer)

export default TranslatedFooter
