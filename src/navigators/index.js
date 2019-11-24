import React from 'react'
import { createAppContainer } from 'react-navigation'
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch'

import { setTopLevelNavigator } from '@/utils/navigation'
import Init from '@/boot/init'
import AuthNavigator from './auth-stack'
import MainNavigator from './main-stack'

const AppContainer = createAppContainer(createAnimatedSwitchNavigator({
  Init,
  Auth: AuthNavigator,
  Main: MainNavigator
}, {}))

export default (props) => (
  <AppContainer
    {...props}
    ref={(ref) => setTopLevelNavigator(ref)}
  />
)
