import React from 'react'
import PropTypes from 'prop-types'
import { Text, StyleSheet, ActivityIndicator } from 'react-native'
import { Button, Icon } from 'native-base'

import { Colors } from '@/theme'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY
  },
  text: {
    textAlign: 'center',
    color: 'white'
  },
  disabled: {
    opacity: 0.5
  }
})

const ButtonComponent = ({ icon, text, children, fluid, style, loading, disabled, ...props }) => {
  style = [
    style,
    styles.container,
    fluid && styles.fluid,
    disabled && styles.disabled
  ]

  return (
    <Button
      style={style}
      iconLeft={icon}
      disabled={disabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <>
          {icon && (
            <Icon name={icon} />
          )}
          <Text style={styles.text}>
            {text || children}
          </Text>
        </>
      )}
    </Button>
  )
}

ButtonComponent.propTypes = {
  text: PropTypes.string,
  loading: PropTypes.bool,
  icon: PropTypes.string,
  fluid: PropTypes.bool,
  disabled: PropTypes.bool
}

ButtonComponent.defaultProps = {
  fluid: false
}

export default ButtonComponent
