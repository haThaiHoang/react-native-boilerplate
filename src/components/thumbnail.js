import React from 'react'
import PropTypes from 'prop-types'
import { Image } from 'react-native'

import { Images } from '@/theme'

const Thumbnail = ({ url, size, rounded, style, ...props }) => (
  <Image
    style={[{
      width: size || 40,
      height: size || 40,
      borderRadius: rounded ? (size || 40) / 2 : 0
    }, style]}
    source={url ? { uri: url } : Images.AVATAR_PLACEHOLDER}
    {...props}
  />
)

Thumbnail.propTypes = {
  url: PropTypes.string.isRequired,
  size: PropTypes.number,
  rounded: PropTypes.bool
}

export default Thumbnail
