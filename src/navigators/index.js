import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
// import createAnimatedSwitchNavigator from 'react-navigation-animated-switch'

import { setTopLevelNavigator } from '@/utils/navigation'
import { Colors } from '@/theme'
import Init from '@/boot/init'
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
        iconName = 'home'
        break
      case 'Settings':
        iconName = 'cog'
        break
      default:
    }

    return {
      tabBarIcon: ({ tintColor } : Object) => (
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

const AppContainer = createAppContainer(createSwitchNavigator({
  Init,
  Auth: AuthNavigator,
  Main: MainNavigator
}))


export default (props) => (
  <AppContainer
    {...props}
    ref={(ref) => setTopLevelNavigator(ref)}
  />
)
