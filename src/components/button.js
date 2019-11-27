import React from 'react'
import PropTypes from 'prop-types'
import { Text, StyleSheet, ActivityIndicator } from 'react-native'
import { Button, Icon } from 'native-base'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    color: 'white'
  }
})

const ButtonComponent = ({ icon, text, children, fluid, style, loading, ...props }) => {
  style = [
    style,
    styles.container,
    fluid && styles.fluid
  ]

  return (
    <Button
      style={style}
      iconLeft={icon}
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
  fluid: PropTypes.bool
}

ButtonComponent.defaultProps = {
  fluid: false
}

export default ButtonComponent
