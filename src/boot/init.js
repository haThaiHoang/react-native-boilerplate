import { Component } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import SplashScreen from 'react-native-splash-screen'
import * as Yup from 'yup'

import Request from '@/utils/request'
import navigation from '@/utils/navigation'

Yup.setLocale({
  mixed: {
    required: 'required'
  },
  string: {
    email: 'email'
  }
})

class Init extends Component {
  async componentDidMount() {
    const token = await AsyncStorage.getItem('ACCESS_TOKEN')

    if (token) {
      Request.setAccessToken(token)
      navigation.navigate('Main')
    } else {
      navigation.navigate('Auth')
    }

    SplashScreen.hide()
  }

  render() {
    return null
  }
}

export default Init
