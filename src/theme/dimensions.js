import { Platform, Dimensions } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { getStatusBarHeight } from 'react-native-status-bar-height'

let width
let height

if (Platform.OS === 'android') {
  width = Dimensions.get('window').width
  height = Dimensions.get('window').height + getStatusBarHeight()
} else {
  width = Dimensions.get('window').width
  height = Dimensions.get('window').height
}

export const IS_EXTEND_SCREEN = height / width > 1.8
export const SCREEN_WIDTH = width
export const SCREEN_HEIGHT = height
export const STATUS_BAR_HEIGHT = getStatusBarHeight()
export const TOOL_BAR_HEIGHT = 55
export const TAB_BAR_HEIGHT = 50
export const IPHONEX_BOTTOM_HEIGHT = getBottomSpace()
export const BOTTOM_BAR_HEIGHT = 55 + IPHONEX_BOTTOM_HEIGHT
