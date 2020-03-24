import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import Spinner from 'react-native-spinkit'
import memoizeOne from 'memoize-one'
import lodash from 'lodash'

import { Colors } from '@/theme'
import Icon from './icon'
import Typography from './typography'

const getStyles = memoizeOne((type, size, disabled) => {
  const text = {
    color: 'white'
  }

  let container = {
    backgroundColor: Colors.PRIMARY,
    height: 35,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25
  }

  let icon = {}

  if (type === 'icon') {
    icon = lodash.merge(icon, {
      fontSize: 25,
      color: 'white',
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 1.5
    })

    container = lodash.merge(container, {
      backgroundColor: null,
      borderRadius: 0,
      width: 30,
      height: 30,
      paddingHorizontal: 0,
      justifyContent: 'center',
      alignItems: 'center'
    })
  }

  if (size === 'large') {
    container = lodash.merge(container, {
      height: 40,
      borderRadius: 20
    })

    if (type === 'icon') {
      container = lodash.merge(container, {
        width: 40,
        height: 40
      })
    }
  }

  if (disabled) {
    container = lodash.merge(container, {
      opacity: 0.5
    })
  }

  return {
    container,
    text,
    icon
  }
})

const Button = ({
  text,
  color,
  children,
  icon,
  iconType,
  loading,
  type,
  size,
  disabled,
  onPress,
  style,
  ...props
}) => {
  const styles = getStyles(type, size, disabled)

  return (
    <TouchableOpacity
      {...props}
      onPress={loading || disabled ? null : onPress}
      activeOpacity={0.7}
      disabled={disabled}
      style={[styles.container, style]}
    >
      {loading ? (
        <Spinner
          color="white"
          size={30}
          type="Pulse"
        />
      ) : (
        <>
          {icon && (
            <Icon
              name={icon}
              type={iconType}
              style={styles.icon}
            />
          )}
          {(text || children) && (
            <Typography style={styles.text}>
              {text || children}
            </Typography>
          )}
        </>
      )}
    </TouchableOpacity>
  )
}

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  iconType: PropTypes.string,
  size: PropTypes.string,
  type: PropTypes.string,
  loading: PropTypes.bool,
  icon: PropTypes.string,
  disabled: PropTypes.bool,
  onPress: PropTypes.func
}

export default Button
