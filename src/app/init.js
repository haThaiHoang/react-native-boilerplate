import { Component } from 'react'
import { connect } from 'react-redux'
import { withLocalize } from 'react-localize-redux'
import AsyncStorage from '@react-native-community/async-storage'
import * as Yup from 'yup'

import Request from '@/utils/request'
import errorMessagesVN from '@/languages/error-messages/vn.json'
import validationVN from '@/languages/validation/vn.json'

Yup.setLocale({
  mixed: {
    required: 'required'
  },
  string: {
    email: 'email'
  }
})

@withLocalize
@connect(null)

class Init extends Component {
  constructor(props) {
    super(props)
    const { initialize, addTranslationForLanguage: add } = props

    initialize({
      languages: [{
        name: 'Vietnam',
        code: 'vn'
      }],
      options: {
        renderToStaticMarkup: false
      }
    })
    add(errorMessagesVN, 'vn')
    add(validationVN, 'vn')

    AsyncStorage.getItem('ACCESS_TOKEN').then((token) => {
      Request.setAccessToken(token)
    })
  }

  render() {
    return null
  }
}

export default Init
