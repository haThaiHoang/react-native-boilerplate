import React from 'react'
import { View, StyleSheet } from 'react-native'

import Typography from '@/components/typography'
import Icon from '@/components/icon'
import { Colors } from '@/theme'

const styles = StyleSheet.create({
  box: {
    flex: 1,
    paddingTop: 25,
    alignItems: 'center'
  },
  icon: {
    color: Colors.DARK,
    marginBottom: 5,
    fontSize: 40
  }
})

export default () => (
  <View style={styles.box}>
    <Icon name="alert" style={styles.icon} />
    <Typography large bold>データなし</Typography>
  </View>
)
