import React from 'react'
import { View, StyleProp, ViewStyle } from 'react-native'

type TProps = {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around'
  alignItems?: 'center' | 'flex-start' | 'flex-end'
  flexDirection?: 'column' | 'column-reverse' | 'row' | 'row-reverse'
  flex?: number
  gap?: number
}

const Box = (props: TProps) => {
  const {
    style,
    children,
    justifyContent,
    alignItems,
    flexDirection,
    flex,
    gap,
  } = props

  return (
    <View
      style={[{
        flex,
        justifyContent,
        alignItems,
        flexDirection,
        gap,
      }, style]}
    >
      {children}
    </View>
  )
}

export default Box
