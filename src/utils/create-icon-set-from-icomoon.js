import React, { PureComponent } from 'react'
import {
  Platform,
  Text
} from 'react-native'

function createIconSet(
  glyphMap,
  fontFamily,
  fontFile,
  fontStyle
) {
  const fontBasename = fontFile
    ? fontFile.replace(/\.(otf|ttf)$/, '')
    : fontFamily

  const fontReference = Platform.select({
    windows: `/Assets/${fontFile}#${fontFamily}`,
    android: fontBasename,
    web: fontBasename,
    default: fontFamily
  })

  class Icon extends PureComponent {
    static defaultProps = {
      size: 12,
      allowFontScaling: false
    };

    root = null;

    setNativeProps(nativeProps) {
      if (this.root) {
        this.root.setNativeProps(nativeProps)
      }
    }

    handleRef = (ref) => {
      this.root = ref
    };

    render() {
      const { name, size, color, style, children, ...props } = this.props

      let glyph = name ? glyphMap[name] || '?' : ''
      if (typeof glyph === 'number') {
        glyph = String.fromCharCode(glyph)
      }

      const styleDefaults = {
        fontSize: size,
        color
      }

      const styleOverrides = {
        fontFamily: fontReference,
        fontWeight: 'normal',
        fontStyle: 'normal'
      }

      props.style = [styleDefaults, style, styleOverrides, fontStyle || {}]
      props.ref = this.handleRef

      return (
        <Text {...props}>
          {glyph}
          {children}
        </Text>
      )
    }
  }

  return Icon
}

export default function createIconSetFromIcoMoon(
  config,
  fontFamilyArg,
  fontFile
) {
  const glyphMap = {}
  config.icons.forEach((icon) => {
    icon.properties.name.split(/\s*,\s*/g).forEach((name) => {
      glyphMap[name] = icon.properties.code
    })
  })

  const fontFamily = fontFamilyArg || config.preferences.fontPref.metadata.fontFamily

  return createIconSet(glyphMap, fontFamily, fontFile || `${fontFamily}.ttf`)
}
