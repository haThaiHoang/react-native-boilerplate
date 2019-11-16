import React from 'react'
import { Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  text: {
  }
})

export default ({ children }) => (
  <Text style={styles.text}>
    {children}
  </Text>
)
