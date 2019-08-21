import React from 'react'
import { View, StyleSheet, Text, StatusBar, Platform } from 'react-native'

import { Colors } from '@/theme'

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    backgroundColor: Colors.PRIMARY_700
  },
  content: {
    height: 55,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: Platform.OS === 'ios' ? 'center' : 'flex-start'
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

export default ({ title }) => (
  <View style={styles.container}>
    <View style={styles.content}>
      <Text style={styles.title}>{title}</Text>
    </View>
  </View>
)
