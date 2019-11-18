import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from 'react-redux'

import Container from '@/components/container'
import Screen from '@/components/screen'
import Button from '@/components/button'
import Toolbar from '@/components/toolbar'
import { actions } from '@/store/actions'

@connect(null, {
  clearStore: actions.clearStore
})

class Settings extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    clearStore: PropTypes.func.isRequired
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
