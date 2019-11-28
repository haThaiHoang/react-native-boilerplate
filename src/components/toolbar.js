import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'
import { getStatusBarHeight } from 'react-native-status-bar-height'

import { Colors } from '@/theme'
import navigation from '@/utils/navigation'

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    paddingTop: getStatusBarHeight(),
    backgroundColor: Colors.PRIMARY,
    elevation: 5
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
  actionBox: {
    position: 'absolute',
    left: 0
  },
  actionButton: {
    width: 55,
    height: 55,
    tintColor: 'white',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionButtonIcon: {
    color: 'white'
  }
})

const Toolbar = ({ title, back }) => (
  <View style={styles.container}>
    <View style={styles.content}>
      <View style={styles.actionBox}>
        {back && (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.actionButton}
            onPress={() => navigation.back()}
          >
            <Icon
              style={styles.actionButtonIcon}
              name="arrow-back"
            />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
  </View>
)

Toolbar.propTypes = {
  title: PropTypes.string,
  back: PropTypes.bool
}

export default Toolbar
