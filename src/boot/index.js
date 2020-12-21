import React from 'react'
import { StatusBar } from 'react-native'
import 'react-native-gesture-handler'

import Store from '@/store'
import Init from '@/boot/init'
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
    <Init>
      <Navigators />
    </Init>
    <MaskLoader
      ref={(ref) => MaskLoader.setInstance(ref)}
    />
    <Toast
      ref={(ref) => Toast.setInstance(ref)}
    />
  </Store>
)
