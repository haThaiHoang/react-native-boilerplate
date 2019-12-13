import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import Spinner from 'react-native-spinkit'

import { Colors } from '@/theme'

let instance

const styles = StyleSheet.create({
  mask: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: Colors.setAlpha('black', 0.2),
    alignItems: 'center',
    justifyContent: 'center'
  }
})

class MaskLoader extends Component {
  static propTypes = {}

  state = {
    visible: false
  }

  static setInstance = (ref) => {
    instance = ref
  }

  static show = () => {
    if (instance) {
      instance.show()
    }
  }

  static hide = () => {
    if (instance) {
      instance.hide()
    }
  }

  show = () => {
    this.setState({
      visible: true
    })
  }

  hide = () => {
    this.setState({
      visible: false
    })
  }

  render() {
    const { visible } = this.state

    if (!visible) return null

    return (
      <View style={styles.mask}>
        <Spinner color="white" size={40} type="9CubeGrid" />
      </View>
    )
  }
}

export default MaskLoader
