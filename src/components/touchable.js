import React from 'react'
import { Platform, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native'

const Component = Platform.select({
  ios: ({ children, ...props }) => (
    <TouchableOpacity activeOpacity={0.7} {...props}>
      {children}
    </TouchableOpacity>
  ),
  android: ({ children, style, ...props }) => (
    <TouchableNativeFeedback {...props}>
      <View style={style}>
        {children}
      </View>
    </TouchableNativeFeedback>
  )
})

export default ({ children, ...props }) => (
  <Component {...props}>
    {children}
  </Component>
)
