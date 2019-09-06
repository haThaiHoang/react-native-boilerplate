import React, { Component } from 'react'
import { StatusBar, Text, View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import styles from './styles'

class Splash extends Component {
  constructor(props) {
    super(props)
    this._bootstrapAsync()
  }

  _bootstrapAsync = async () => {
    try {
      const { navigation } = this.props
      const accessToken = await AsyncStorage.getItem('ACCESS_TOKEN')

      setTimeout(() => {
        if (accessToken) {
          navigation.navigate('Main')
        } else navigation.navigate('Auth')
        StatusBar.setHidden(false)
      }, 2000)
    } catch (e) {
      // eslint-disable-next-line
      console.error('Get AccessToken failed')
      StatusBar.setHidden(false)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          M-Medic
        </Text>
      </View>
    )
  }
}

export default Splash
