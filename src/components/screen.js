import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  }
})

const Screen = ({ children }) => (
  <View style={styles.screen}>
    {children}
  </View>
)

Screen.propTypes = {
  children: PropTypes.node.isRequired
}

export default Screen
