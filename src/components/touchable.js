import React from 'react'
import { TouchableOpacity } from 'react-native'

export default ({ children, ...props }) => (
  <TouchableOpacity activeOpacity={0.6} {...props}>
    {children}
  </TouchableOpacity>
)
