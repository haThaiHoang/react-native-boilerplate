import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native'

import { FontSizes, Colors } from '@/theme'

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY,
    height: 50,
    borderRadius: 3,
    justifyContent: 'center'
  },
  fluid: {
    width: '100%'
  },
  text: {
    textAlign: 'center',
    fontSize: FontSizes.NORMAL,
    color: 'white'
  }
})

const Button = ({ text, fluid, style, loading, ...props }) => {
  style = [
    style,
    styles.container,
    fluid && styles.fluid
  ]

  return (
    <TouchableOpacity style={style} {...props}>
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  )
}

Button.propTypes = {
  text: PropTypes.any,
  style: PropTypes.object,
  loading: PropTypes.bool,
  fluid: PropTypes.bool
}

Button.defaultProps = {
  fluid: false
}

export default Button
