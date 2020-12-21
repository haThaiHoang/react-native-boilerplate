import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { inject, observer } from 'mobx-react'

import { setTopLevelNavigator } from '@/utils/navigation'
import screenOptions from '@/navigators/screen-options'

// Auth
import Login from '@/screens/auth/login'

// Home
import Home from '@/screens/home'

// List
import List from '@/screens/list'
import ItemDetails from '@/screens/list/item-details-screen'

// List
import Settings from '@/screens/settings'

const Stack = createStackNavigator()

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
      <Stack.Screen name="List" component={List} options={screenOptions.modal} />
      <Stack.Screen name="ItemDetails" component={ItemDetails} options={screenOptions.card} />
      <Stack.Screen name="Settings" component={Settings} options={screenOptions.modal} />
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
