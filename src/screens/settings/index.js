import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { inject } from 'mobx-react'

import Container from '@/components/container'
import Screen from '@/components/screen'
import Button from '@/components/button'
import Toolbar from '@/components/toolbar'

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20
  }
})

@inject((stores) => ({
  authStore: stores.auth
}))
class Settings extends Component {
  static propTypes = {
    authStore: PropTypes.object
  }

  _onLogOut = async () => {
    const { authStore } = this.props

    await AsyncStorage.removeItem('ACCESS_TOKEN')
    authStore.setLoggedIn(false)
  }

  render() {
    return (
      <Screen>
        <Toolbar title="Settings" back />
        <Container style={styles.container}>
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
