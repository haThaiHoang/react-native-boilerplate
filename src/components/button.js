import React from 'react'
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native'
import tinycolor from 'tinycolor2'

import { FontSizes } from '@/theme'

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderRadius: 3,
    justifyContent: 'center'
  },
  fluid: {
    width: '100%'
  },
  text: {
    textAlign: 'center',
    fontSize: FontSizes.NORMAL
  },
  textLight: {
    color: 'white'
  },
  textDark: {
    color: 'black'
  }
})

const Button = ({ text, fluid, background, style, loading, ...props }) => {
  style = [
    style,
    styles.container,
    fluid && styles.fluid,
    { backgroundColor: background }
  ]

  return (
    <TouchableOpacity style={style} {...props}>
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={[styles.text, { color: tinycolor(background).isLight() ? 'black' : 'white' }]}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  )
}

Button.defaultProps = {
  background: 'white',
  fluid: false
}

export default Button
