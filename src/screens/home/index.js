import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { inject } from 'mobx-react'
import AsyncStorage from '@react-native-community/async-storage'

import Screen from '@/components/screen'
import Toolbar from '@/components/toolbar'
import Container from '@/components/container'
import Button from '@/components/button'
import { navigate } from '@/utils/navigation'

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15
  },
  list: {
    padding: 15
  },
  item: {
    marginBottom: 10
  }
})

@inject((stores) => ({
  authStore: stores.auth
}))
class Home extends Component {
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
        <Toolbar title="Home" />
        <Container style={styles.container}>
          <Button
            style={styles.item}
            onPress={() => navigate('Components')}
          >
            Components
          </Button>
          <Button
            style={styles.item}
            onPress={this._onLogOut}
          >
            Logout
          </Button>
        </Container>
      </Screen>
    )
  }
}

export default Home
