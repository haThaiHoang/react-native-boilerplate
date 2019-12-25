import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'

const Typography = ({ children, large, big, light, bold, style }) => {
  const handleStyle = {
    fontSize: large ? 20 : big ? 25 : 14,
    fontWeight: bold ? 'bold' : 'normal',
    color: light ? 'white' : null
  }

  return (
    <Text
      style={[
        style,
        handleStyle
      ]}
    >
      {children}
    </Text>
  )
}

Typography.propTypes = {
  large: PropTypes.bool,
  big: PropTypes.bool,
  bold: PropTypes.bool,
  light: PropTypes.bool
}

export default Typography
