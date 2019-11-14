import React, { Component } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { withLocalize } from 'react-localize-redux'
import { connect } from 'react-redux'

import Container from '@/components/container'
import Screen from '@/components/screen'
import Button from '@/components/button'
import Icon from '@/components/icon'
import Toolbar from '@/components/toolbar'
import { actions } from '@/store/actions'

@withLocalize
@connect(null, {
  clearStore: actions.clearStore
})

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
    const { navigation, clearStore } = this.props

    await AsyncStorage.removeItem('ACCESS_TOKEN')
    navigation.navigate('Login')
    clearStore()
  }

  render() {
    return (
      <Screen>
        <Toolbar title="Settings" />
        <Container>
          <Button
            text="Logout"
            onPress={this._onLogOut}
          />
        </Container>
      </Screen>
    )
  }
}

export default Settings
