import React from 'react'
import { StatusBar } from 'react-native'

import { Colors } from '@/theme'
import Store from '@/store'
import Navigators from '@/navigators'

export default () => (
  <Store>
    <StatusBar
      animated
      translucent
      backgroundColor={Colors.setAlpha('black', 0.2)}
      barStyle="light-content"
    />
    <Navigators />
  </Store>
)
