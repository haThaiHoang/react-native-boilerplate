import React from 'react'
import { StatusBar } from 'react-native'
import 'react-native-gesture-handler'

import Store from '@/store'
import Navigators from '@/navigators'
import MaskLoader from '@/components/mask-loader'
import Toast from '@/components/toast'

export default () => (
  <Store>
    <StatusBar
      animated
      translucent
      barStyle="light-content"
      backgroundColor="transparent"
    />
    <Navigators />
    <MaskLoader
      ref={(ref) => MaskLoader.setInstance(ref)}
    />
    <Toast
      ref={(ref) => Toast.setInstance(ref)}
    />
  </Store>
)
