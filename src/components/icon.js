import React from 'react'
import { Text } from 'react-native'

const iconMaps = [{
  name: 'tv',
  code: <>&#xe900;</>
}, {
  name: 'block',
  code: <>&#xe901;</>
}, {
  name: 'film',
  code: <>&#xe902;</>
}, {
  name: 'news',
  code: <>&#xe903;</>
}, {
  name: 'cog',
  code: <>&#xe904;</>
}, {
  name: 'bolt',
  code: <>&#xe905;</>
}, {
  name: 'hand',
  code: <>&#xe906;</>
}, {
  name: 'search',
  code: <>&#xe908;</>
}, {
  name: 'menu',
  code: <>&#xe909;</>
}, {
  name: 'close',
  code: <>&#xe907;</>
}]

const Icon = ({ name, size, color, style, ...props }) => {
  const { code } = iconMaps.find((icon) => icon.name === name) || {}

  return (
    <Text
      style={[{
        fontFamily: 'Icomoon',
        fontSize: size,
        color
      }, style]}
      {...props}
    >
      {code}
    </Text>
  )
}

Icon.defaultProps = {
  size: 40,
  color: 'black'
}

export default Icon
