import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation'
import { createReduxContainer } from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'

import Splash from '@/screens/splash'
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
  Splash,
  Auth: AuthNavigator,
  Main: MainNavigator
}, {
  initialRouteName: 'Splash'
})

export default connect(state => ({
  state: state.navigation
}))(createReduxContainer(RootNavigator))
