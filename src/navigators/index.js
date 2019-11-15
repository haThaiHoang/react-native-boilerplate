import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch'
import { Transition } from 'react-native-reanimated'

import Login from '@/screens/auth/login'
import Home from '@/screens/home'
import Settings from '@/screens/settings'

const MainNavigator = createBottomTabNavigator({
  Home,
  Settings
}, {
  tabBarOptions: {
    showLabel: false,
    showIcon: true,
    indicatorStyle: {
      backgroundColor: 'white'
    }
  }
})

const AuthNavigator = createStackNavigator({
  Login
})

const SwitchNavigator = createAnimatedSwitchNavigator({
  Auth: AuthNavigator,
  Main: MainNavigator
}, {
  transition: (
    <Transition.Together>
      <Transition.Out
        type="slide-left"
        durationMs={300}
        interpolation="easeIn"
      />
      <Transition.In type="fade" durationMs={400} />
    </Transition.Together>
  )
})

export default createAppContainer(SwitchNavigator)
