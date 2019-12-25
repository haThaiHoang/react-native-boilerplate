import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15
  },
  full: {
    flex: 1
  }
})

const Container = ({ children, full, style }) => (
  <View style={[style, styles.container, full && styles.full]}>
    {children}
  </View>
)

Container.propTypes = {
  children: PropTypes.node.isRequired,
  full: PropTypes.bool
}

export default Container
