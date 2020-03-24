import React from 'react'
import { StyleProvider, getTheme } from 'native-base'
import platform from 'native-base/dist/src/theme/variables/platform'

import * as FontSizes from './font-sizes'
import * as Images from './images'
import * as Colors from './colors'
import * as Dimensions from './dimensions'

platform.brandPrimary = Colors.PRIMARY

const Theme = ({ children }) => (
  <StyleProvider
    style={getTheme(platform)}
  >
    <>
      {children}
    </>
  </StyleProvider>
)

export {
  FontSizes,
  Images,
  Colors,
  Dimensions
}

export default Theme
