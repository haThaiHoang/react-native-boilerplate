import React, { Component } from 'react'
import { View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import { Container, Button, Icon, Toolbar } from '@/components'

class Settings extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name="cog"
        color={tintColor}
        size={26}
      />
    )
  }

  _onLogOut = async () => {
    const { navigation } = this.props

    await AsyncStorage.removeItem('ACCESS_TOKEN')
    navigation.navigate('Login')
  }

  render() {
    return (
      <Container>
        <Toolbar title="Cài đặt" />
        <Button
          text="Logout"
          onPress={this._onLogOut}
        />
      </Container>
    )
  }
}

export default Settings
