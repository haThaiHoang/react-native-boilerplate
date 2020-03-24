import React from 'react'
import { StatusBar } from 'react-native'
import { Root } from 'native-base'
import '@/translations'

import Store from '@/store'
import Theme, { Colors } from '@/theme'
import Init from '@/boot/init'
import Navigators from '@/navigators'
import MaskLoader from '@/components/mask-loader'

export default () => (
  <Store>
    <StatusBar
      animated
      translucent
      backgroundColor={Colors.setAlpha('black', 0.2)}
      barStyle="light-content"
    />
    <Theme>
      <Root>
        <Init />
        <Navigators />
      </Root>
    </Theme>
    <MaskLoader
      ref={(ref) => MaskLoader.setInstance(ref)}
    />
  </Store>
)
