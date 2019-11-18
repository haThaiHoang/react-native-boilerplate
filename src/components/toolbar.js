import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

import { Colors } from '@/theme'

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    paddingTop: getStatusBarHeight(),
    backgroundColor: Colors.PRIMARY
  },
  content: {
    height: 55,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: 'white',
    fontSize: 20
  },
  menuButton: {
    width: 40,
    height: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginRight: 15
  }
})

const Toolbar = ({ title }) => (
  <View style={styles.container}>
    <View style={styles.content}>
      <Text style={styles.title}>{title}</Text>
    </View>
  </View>
)

Toolbar.propTypes = {
  title: PropTypes.string
}

export default Toolbar
