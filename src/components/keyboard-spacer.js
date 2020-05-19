import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Keyboard,
  LayoutAnimation,
  View,
  ViewPropTypes,
  Platform,
  StyleSheet
} from 'react-native'

import { Dimensions } from '@/theme'

const styles = StyleSheet.create({
  container: {
    left: 0,
    right: 0,
    bottom: 0
  }
})

// From: https://medium.com/man-moon/writing-modern-react-native-ui-e317ff956f02
const defaultAnimation = {
  duration: 500,
  create: {
    duration: 300,
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity
  },
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 200
  }
}

export default class KeyboardSpacer extends Component {
  static propTypes = {
    topSpacing: PropTypes.number,
    onToggle: PropTypes.func,
    style: ViewPropTypes.style,
    disableAndroidBehavior: PropTypes.bool
  }

  static defaultProps = {
    topSpacing: 0,
    onToggle: () => null
  }

  constructor(props, context) {
    super(props, context)
    const { disableAndroidBehavior } = props

    this.state = {
      keyboardSpace: 0
    }

    if (disableAndroidBehavior && Platform.OS === 'android') return
    this._listeners = null
    this.updateKeyboardSpace = this.updateKeyboardSpace.bind(this)
    this.resetKeyboardSpace = this.resetKeyboardSpace.bind(this)
  }

  componentDidMount() {
    const { disableAndroidBehavior } = this.props

    if (disableAndroidBehavior && Platform.OS === 'android') return

    const updateListener = Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow'
    const resetListener = Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide'
    this._listeners = [
      Keyboard.addListener(updateListener, this.updateKeyboardSpace),
      Keyboard.addListener(resetListener, this.resetKeyboardSpace)
    ]
  }

  componentWillUnmount() {
    const { disableAndroidBehavior } = this.props

    if (disableAndroidBehavior && Platform.OS === 'android') return

    this._listeners.forEach((listener) => listener.remove())
  }

  updateKeyboardSpace(event) {
    const { onToggle, topSpacing } = this.props

    if (!event.endCoordinates) {
      return
    }

    let animationConfig = defaultAnimation
    if (Platform.OS === 'ios') {
      animationConfig = LayoutAnimation.create(
        event.duration,
        LayoutAnimation.Types[event.easing],
        LayoutAnimation.Properties.opacity
      )
    }
    LayoutAnimation.configureNext(animationConfig)

    // when external physical keyboard is connected
    // event.endCoordinates.height still equals virtual keyboard height
    // however only the keyboard toolbar is showing if there should be one
    const keyboardSpace = (Dimensions.SCREEN_HEIGHT - event.endCoordinates.screenY) + topSpacing
    this.setState({
      keyboardSpace
    }, onToggle(true, keyboardSpace))
  }

  resetKeyboardSpace(event) {
    const { onToggle } = this.props

    let animationConfig = defaultAnimation
    if (Platform.OS === 'ios') {
      animationConfig = LayoutAnimation.create(
        event.duration,
        LayoutAnimation.Types[event.easing],
        LayoutAnimation.Properties.opacity
      )
    }
    LayoutAnimation.configureNext(animationConfig)

    this.setState({
      keyboardSpace: 0
    }, onToggle(false, 0))
  }

  render() {
    const { style } = this.props
    const { keyboardSpace } = this.state

    return (
      <View style={[styles.container, { height: keyboardSpace }, style]} />
    )
  }
}
