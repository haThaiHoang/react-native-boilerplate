import { Component } from 'react'
import PropTypes from 'prop-types'
import AsyncStorage from '@react-native-community/async-storage'
import SplashScreen from 'react-native-splash-screen'
import EStyleSheet from 'react-native-extended-stylesheet'
import * as Yup from 'yup'
import { inject } from 'mobx-react'

import Request from '@/utils/request'

EStyleSheet.build()
Yup.setLocale({
  mixed: {
    required: 'required'
  },
  string: {
    email: 'email'
  }
})

@inject((stores) => ({
  authStore: stores.auth
}))
class Init extends Component {
  static propTypes = {
    authStore: PropTypes.object
  }

  state = {
    inited: false
  }

  async componentDidMount() {
    const { authStore } = this.props

    const token = await AsyncStorage.getItem('ACCESS_TOKEN')

    if (token) {
      authStore.setLoggedIn(true)
      Request.setAccessToken(token)
    }

    this.setState({ inited: true })

    setTimeout(() => {
      SplashScreen.hide()
    }, 200)
  }

  render() {
    const { children } = this.props
    const { inited } = this.state

    return inited ? children : null
  }
}

export default Init
