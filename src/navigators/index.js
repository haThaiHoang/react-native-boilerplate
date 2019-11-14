import { createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createReduxContainer } from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'

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

export const RootNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  Main: MainNavigator
}, {
  initialRouteName: 'Auth'
})

export default connect((state) => ({
  state: state.navigation
}))(createReduxContainer(RootNavigator))
