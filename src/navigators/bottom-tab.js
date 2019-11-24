import React from 'react'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Icon } from 'native-base'

import { Colors } from '@/theme'
import Home from '@/screens/home'
import Settings from '@/screens/settings'

export default createBottomTabNavigator({
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
        iconName = 'settings'
        break
      default:
    }

    return {
      tabBarIcon: ({ tintColor } : Object) => (
        <Icon
          name={iconName}
          style={{
            color: tintColor
          }}
        />
      ),
      tabBarLabel: false
    }
  }
})
