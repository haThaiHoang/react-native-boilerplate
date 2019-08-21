import React from 'react'
import { StatusBar, SafeAreaView } from 'react-native'

import { Colors } from '@/theme'
import Store from '@/store'
import Init from './init'
import Navigation from './navigation'

export default () => (
  <Store>
    <Init />
    <StatusBar
      animated
      translucent
      backgroundColor={Colors.setAlpha('black', 0.2)}
      barStyle="light-content"
    />
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.PRIMARY_700 }}>
      <Navigation />
    </SafeAreaView>
  </Store>
)
