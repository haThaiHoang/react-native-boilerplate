import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
})

class Container extends Component {
  static Content = 123

  render() {
    const { children } = this.props

    return (
      <View style={styles.container}>
        {children}
      </View>
    )
  }
}

export default Container
