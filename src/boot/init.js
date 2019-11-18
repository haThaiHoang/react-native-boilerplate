import { Component } from 'react'
import PropTypes from 'prop-types'
import AsyncStorage from '@react-native-community/async-storage'
import SplashScreen from 'react-native-splash-screen'
import * as Yup from 'yup'

import Request from '@/utils/request'

Yup.setLocale({
  mixed: {
    required: 'required'
  },
  string: {
    email: 'email'
  }
})

class Init extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  async componentDidMount() {
    const { navigation } = this.props
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
