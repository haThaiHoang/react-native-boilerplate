import React from 'react'
import PropTypes from 'prop-types'
import { Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  text: {
  }
})

const Typography = ({ children }) => (
  <Text style={styles.text}>
    {children}
  </Text>
)

Typography.propTypes = {
  children: PropTypes.string.isRequired
}

export default Typography
