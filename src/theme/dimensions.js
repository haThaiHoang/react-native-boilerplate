import { Platform, Dimensions } from 'react-native'
import ExtraDimensions from 'react-native-extra-dimensions-android'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { getStatusBarHeight } from 'react-native-status-bar-height'

let WIDTH
let HEIGHT

if (Platform.OS === 'android') {
  WIDTH = ExtraDimensions.getRealWindowWidth()
  HEIGHT = ExtraDimensions.getRealWindowHeight() - ExtraDimensions.getSoftMenuBarHeight()
} else {
  WIDTH = Dimensions.get('window').width
  HEIGHT = Dimensions.get('window').height
}

export const SCREEN_WIDTH = WIDTH
export const SCREEN_HEIGHT = HEIGHT
export const STATUS_BAR_HEIGHT = getStatusBarHeight()
export const TOOL_BAR_HEIGHT = 55
export const BOTTOM_BAR_HEIGHT = 50
export const IPHONEX_BOTTOM_HEIGHT = getBottomSpace()
