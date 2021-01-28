import React, { Component } from 'react'
import { StyleSheet } from 'react-native'

import Screen from '@/components/screen'
import Toolbar from '@/components/toolbar'
import Container from '@/components/container'
import Button from '@/components/button'
import { navigate } from '@/utils/navigation'

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15
  }
})

class Components extends Component {
  render() {
    return (
      <Screen>
        <Toolbar back title="Components" />
        <Container style={styles.container}>

        </Container>
      </Screen>
    )
  }
}

export default Components
