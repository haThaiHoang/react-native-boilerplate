import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white'
  }
})

const Screen = ({ children, style }) => (
  <View style={[styles.screen, style]}>
    {children}
  </View>
)

Screen.propTypes = {
  children: PropTypes.node.isRequired
}

export default Screen
