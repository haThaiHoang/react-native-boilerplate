import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'

import Typography from '@/components/typography'
import Icon from '@/components/icon'
import { Colors } from '@/theme'

const styles = StyleSheet.create({
  box: {
    flex: 1,
    paddingVertical: 25,
    alignItems: 'center'
  },
  inverted: {
    transform: [{
      scaleY: -1
    }]
  },
  icon: {
    color: Colors.DARK,
    marginBottom: 5,
    fontSize: 40
  }
})

const NoDataView = ({ inverted, style }) => (
  <View style={[styles.box, inverted && styles.inverted, style]}>
    <Icon name="alert" style={styles.icon} />
    <Typography large bold>No Data</Typography>
  </View>
)
NoDataView.propTypes = {
  inverted: PropTypes.bool,
  style: PropTypes.object
}

export default NoDataView
