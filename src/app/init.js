import React, { Component } from 'react'
import { StatusBar, BackHandler } from 'react-native'
import { connect } from 'react-redux'
import { withLocalize } from 'react-localize-redux'
import AsyncStorage from '@react-native-community/async-storage'
import { NavigationActions } from 'react-navigation'
import SplashScreen from 'react-native-splash-screen'
import * as Yup from 'yup'

import { Colors } from '@/theme'
import Request from '@/utils/request'
import errorMessagesEN from '@/languages/error-messages/en.json'
import validationEN from '@/languages/validation/en.json'

Yup.setLocale({
  mixed: {
    required: 'required'
  },
  string: {
    email: 'email'
  }
})

@withLocalize
@connect((state) => ({
  navigation: state.navigation
}))

class Init extends Component {
  constructor(props) {
    super(props)
    const { initialize, addTranslationForLanguage: add } = props

    initialize({
      languages: [{
        name: 'English',
        code: 'en'
      }],
      options: {
        renderToStaticMarkup: false
      }
    })
    add(errorMessagesEN, 'en')
    add(validationEN, 'en')

    AsyncStorage.getItem('ACCESS_TOKEN').then((token) => {
      Request.setAccessToken(token)
    })
  }

  _onBackPress = () => {
    const { dispatch, navigation } = this.props
    if (navigation.index === 0) {
      return false
    }

    dispatch(NavigationActions.back())
    return true
  }

  componentDidMount() {
    SplashScreen.hide()
    BackHandler.addEventListener('hardwareBackPress', this._onBackPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._onBackPress)
  }

  render() {
    return (
      <StatusBar
        animated
        translucent
        backgroundColor={Colors.setAlpha('black', 0.2)}
        barStyle="light-content"
      />
    )
  }
}

export default Init
