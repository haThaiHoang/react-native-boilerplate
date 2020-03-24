import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { inject, observer } from 'mobx-react'

import { setTopLevelNavigator } from '@/utils/navigation'
import Login from '@/screens/auth/login'
import Home from '@/screens/home'
import List from '@/screens/list'

const Stack = createStackNavigator()

const screenOptions = {
  bottomSheet: {
    cardStyle: {
      backgroundColor: 'transparent'
    },
    cardOverlayEnabled: true,
    gestureEnabled: false,
    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
  },
  modal: {
    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
    gestureEnabled: false
  },
  card: {
    gestureDirection: 'horizontal',
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
  },
  fade: {
    cardStyleInterpolator: ({ current }) => ({
      cardStyle: {
        opacity: current.progress
      }
    }),
    transitionSpec: {
      open: {
        animation: 'timing',
        config: {
          duration: 200
        }
      },
      close: {
        animation: 'timing',
        config: {
          duration: 200
        }
      }
    },
    gestureEnabled: false
  }
}

@inject((stores) => ({
  authStore: stores.auth
}))
@observer
class RootNavigator extends Component {
  static propTypes = {
    authStore: PropTypes.object
  }

  _renderAuthRoutes = () => (
    <>
      <Stack.Screen name="Login" component={Login} options={screenOptions.fade} />
    </>
  )

  _renderMainRoutes = () => (
    <>
      <Stack.Screen name="Home" component={Home} options={screenOptions.fade} />
      <Stack.Screen name="List" component={List} options={screenOptions.fade} />
    </>
  )

  render() {
    const { authStore } = this.props

    return (
      <NavigationContainer ref={(ref) => setTopLevelNavigator(ref)}>
        <Stack.Navigator
          headerMode="none"
          initialRouteName="Splash"
          screenOptions={{
            gestureEnabled: true
          }}
        >
          {authStore.loggedIn ? this._renderMainRoutes() : this._renderAuthRoutes()}
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default RootNavigator
