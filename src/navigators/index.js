import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch'
import { Transition } from 'react-native-reanimated'

import { Colors } from '@/theme'
import Icon from '@/components/icon'
import Login from '@/screens/auth/login'
import Home from '@/screens/home'
import Settings from '@/screens/settings'

const BottomTabNavigator = createBottomTabNavigator({
  Home,
  Settings
}, {
  tabBarOptions: {
    showLabel: false,
    showIcon: true,
    activeTintColor: Colors.PRIMARY,
    inactiveTintColor: 'rgba(0, 0, 0, 0.2)',
    indicatorStyle: {
      backgroundColor: 'white'
    }
  },
  defaultNavigationOptions: ({ navigation }) => {
    let iconName
    // let tabBarLabel
    switch (navigation.state.routeName) {
      case 'Home':
        iconName = 'block'
        break
      case 'Settings':
        iconName = 'cog'
        break
      default:
    }

    return {
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name={iconName}
          color={tintColor}
          size={24}
        />
      ),
      tabBarLabel: false
    }
  }
})

const AuthNavigator = createStackNavigator({
  Login
}, {
  headerMode: 'none'
})

const MainNavigator = createStackNavigator({
  BottomTabNavigator
}, {
  headerMode: 'none'
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
      <Transition.In
        type="fade"
        durationMs={400}
      />
    </Transition.Together>
  )
})

export default createAppContainer(SwitchNavigator)
