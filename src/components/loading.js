import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'

import { Colors } from '@/theme'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
})

export default (props) => (
  <View style={styles.container}>
    <ActivityIndicator
      {...props}
      color={Colors.PRIMARY}
    />
  </View>
)
