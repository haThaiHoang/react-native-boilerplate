import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'
import { getStatusBarHeight } from 'react-native-status-bar-height'

import { Colors, Dimensions } from '@/theme'
import navigation from '@/utils/navigation'

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    paddingTop: getStatusBarHeight(),
    backgroundColor: Colors.PRIMARY,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  },
  content: {
    height: Dimensions.TOOL_BAR_HEIGHT,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: 'white',
    fontSize: 20
  },
  leftActionBox: {
    position: 'absolute',
    left: 0
  },
  rightActionBox: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0
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
    color: 'white',
    fontSize: 24
  }
})

const Toolbar = ({ title, back, actionButtons = [] }) => (
  <View style={styles.container}>
    <View style={styles.content}>
      <View style={styles.leftActionBox}>
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
      <View style={styles.rightActionBox}>
        {actionButtons.map((button, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.7}
            style={styles.actionButton}
            onPress={button.onPress}
          >
            <Icon
              type={button.iconType}
              style={styles.actionButtonIcon}
              name={button.icon}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  </View>
)

Toolbar.propTypes = {
  title: PropTypes.string,
  back: PropTypes.bool,
  actionButtons: PropTypes.array
}

export default Toolbar
