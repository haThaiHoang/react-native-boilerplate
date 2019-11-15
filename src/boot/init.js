import React, { Component } from 'react'
import { StatusBar, BackHandler } from 'react-native'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'
import { NavigationActions } from 'react-navigation'
import SplashScreen from 'react-native-splash-screen'
import * as Yup from 'yup'

import { Colors } from '@/theme'
import Request from '@/utils/request'

Yup.setLocale({
  mixed: {
    required: 'required'
  },
  string: {
    email: 'email'
  }
})

@connect((state) => ({
  navigation: state.navigation
}))

class Init extends Component {
  constructor(props) {
    super(props)

    AsyncStorage.getItem('ACCESS_TOKEN').then((token) => {
      Request.setAccessToken(token)
    })
  }

  componentDidMount() {
    SplashScreen.hide()
    BackHandler.addEventListener('hardwareBackPress', this._onBackPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._onBackPress)
  }

  _onBackPress = () => {
    const { dispatch, navigation } = this.props
    if (navigation.index === 0) {
      return false
    }

    dispatch(NavigationActions.back())
    return true
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
