import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'

import { Colors } from '@/theme'

const Typography = ({
  children,
  align,
  large,
  big,
  small,
  tiny,
  light,
  bold,
  style,
  ...props
}) => {
  const handleStyle = {
    fontSize: large ? 17 : big ? 25 : small ? 12 : tiny ? 10 : 14,
    fontWeight: bold ? 'bold' : 'normal',
    color: light ? 'white' : Colors.DARK,
    textAlign: align
  }

  return (
    <Text
      {...props}
      style={[
        handleStyle,
        style
      ]}
    >
      {children}
    </Text>
  )
}

Typography.propTypes = {
  large: PropTypes.bool,
  big: PropTypes.bool,
  small: PropTypes.bool,
  tiny: PropTypes.bool,
  bold: PropTypes.bool,
  light: PropTypes.bool,
  align: PropTypes.string
}

export default Typography
