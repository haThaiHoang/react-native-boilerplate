import React from 'react'
import { View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    padding: 15
  },
  full: {
    flex: 1
  }
})

export default ({ children, full }) => (
  <View style={[styles.container, full && styles.full]}>
    {children}
  </View>
)
