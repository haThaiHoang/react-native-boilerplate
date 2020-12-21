import React, { Component } from 'react'
import { StyleSheet, View, Animated, Easing, TouchableWithoutFeedback } from 'react-native'

import { Dimensions } from '@/theme'
// import Icon from '@/components/icon'
import Typography from '@/components/typography'
import Thumbnail from '@/components/thumbnail'

let instance

const DURATION = 1500

const styles = StyleSheet.create({
  toastBox: {
    flexDirection: 'row',
    padding: 10,
    position: 'absolute',
    left: 12,
    right: 12,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: 20
  },
  imageBox: {
    justifyContent: 'flex-start'
  },
  toastIconBox: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  toastIcon: {
    color: 'red',
    fontSize: 30
  },
  infoBox: {
    flex: 1,
    paddingLeft: 20,
    justifyContent: 'center',
    minHeight: 30
  },
  toastTitle: {
    marginVertical: 2
  }
})

class Toast extends Component {
  static propTypes = {}

  constructor(props) {
    super(props)

    this._toastTopPosition = new Animated.Value(-60)
    this._toastOpacity = new Animated.Value(0)

    this.state = {
      type: 'show',
      text1: '',
      text2: '',
      image: null,
      onPress: null
    }
  }

  static setInstance = (ref) => {
    instance = ref
  }

  static warning = (...params) => {
    if (instance) {
      instance.show('warning', ...params)
    }
  }

  static error = (...params) => {
    if (instance) {
      instance.show('error', ...params)
    }
  }

  static success = (...params) => {
    if (instance) {
      instance.show('success', ...params)
    }
  }

  static show = (...params) => {
    if (instance) {
      instance.show('show', ...params)
    }
  }

  show = (type, text1, text2, image, duration, onPress) => {
    this.setState({
      type,
      text1,
      text2,
      image,
      onPress
    }, () => this._startAnimation(duration))
  }

  _startAnimation = (duration) => {
    if (!this._isOpen) {
      this._isOpen = true

      this._animatedOpen()
    }

    clearTimeout(this._closeTimeOut)

    this._closeTimeOut = setTimeout(() => {
      this._isOpen = false

      this._animatedClose()
    }, (duration || DURATION) + 600)
  }

  _animatedOpen = () => {
    Animated.parallel([
      Animated.timing(this._toastTopPosition, {
        toValue: Dimensions.STATUS_BAR_HEIGHT + 10,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true
      }),
      Animated.timing(this._toastOpacity, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true
      })
    ]).start()
  }

  _animatedClose = () => {
    Animated.parallel([
      Animated.timing(this._toastTopPosition, {
        toValue: -60,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true
      }),
      Animated.timing(this._toastOpacity, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true
      })
    ]).start()
  }

  _onToastPress = () => {
    const { onPress } = this.state

    clearTimeout(this._closeTimeOut)
    this._isOpen = false

    this._animatedClose()
    if (onPress) onPress()
  }

  _renderToast = () => {
    const { text1, text2, image, type } = this.state

    return (
      <TouchableWithoutFeedback onPress={this._onToastPress}>
        <Animated.View
          style={[styles.toastBox, {
            transform: [{
              translateY: this._toastTopPosition
            }],
            opacity: this._toastOpacity,
            backgroundColor: type === 'warning'
              ? '#d8c14b' : type === 'error'
                ? '#d85b3a' : type === 'success'
                  ? '#15AE67' : 'white'
          }]}
        >
          <View style={styles.imageBox}>
            {image ? (
              <Thumbnail
                url={image}
                rounded
                size={40}
              />
            ) : (
              <View style={styles.toastIconBox}>
                {/* <Icon */}
                {/*  type="custom" */}
                {/*  style={[styles.toastIcon, { */}
                {/*    color: type === 'show' ? 'gray' : 'white' */}
                {/*  }]} */}
                {/*  name={type === 'warning' */}
                {/*    ? 'warning' : type === 'error' */}
                {/*      ? 'error' : type === 'success' */}
                {/*        ? 'like' : 'info'} */}
                {/* /> */}
              </View>
            )}
          </View>
          <View style={styles.infoBox}>
            {!!text2 && (
              <Typography
                bold
                style={[styles.toastTitle, {
                  color: type === 'show' ? 'black' : 'white'
                }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {text1}
              </Typography>
            )}
            <Typography
              style={{
                color: type === 'show' ? 'black' : 'white'
              }}
            >
              {text2 || text1}
            </Typography>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }

  render() {
    return (
      <>
        {this._renderToast()}
      </>
    )
  }
}

export default Toast
