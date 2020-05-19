import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, ActivityIndicator } from 'react-native'

import { Colors } from '@/theme'

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
})

const Loading = ({ color, ...props }) => (
  <View style={styles.container}>
    <ActivityIndicator
      {...props}
      color={color || Colors.DARK}
    />
  </View>
)
Loading.propTypes = {
  color: PropTypes.string
}

export default Loading
