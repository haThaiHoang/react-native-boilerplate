import React, { useMemo } from 'react'
import { Text as RNText, StyleProp, TextStyle } from 'react-native'

type TProps = {
  children: React.ReactNode
  style?: StyleProp<TextStyle>
  fontSize?: number
  fontWeight?: 'bold' | '500' | '600' | 'normal'
  color?: string
  align?: 'left' | 'right' | 'center'
}

const Text = ({
  children,
  align,
  fontSize,
  fontWeight,
  color,
  style,
  ...props
}: TProps) => {
  const computedStyle = useMemo(() => ({
    fontSize: fontSize || 16,
    fontWeight,
    textAlign: align,
    color,
  }), [color, fontSize, align, fontWeight])

  return (
    <RNText
      {...props}
      style={[
        computedStyle,
        style,
      ]}
    >
      {children}
    </RNText>
  )
}
Text

export default Text
