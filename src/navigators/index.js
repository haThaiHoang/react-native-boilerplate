import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { inject, observer } from 'mobx-react'

import { setTopLevelNavigator } from '@/utils/navigation'
import screenOptions from '@/navigators/screen-options'

import Login from '@/screens/auth/login'
import Home from '@/screens/home'
import Components from '@/screens/components'
import List from '@/screens/list'
import ItemDetails from '@/screens/list/item-details-screen'

const Stack = createStackNavigator()

@inject((stores) => ({
  authStore: stores.auth
}))
@observer
class RootNavigator extends Component {
  static propTypes = {
    authStore: PropTypes.object
  }

  _renderPublicRoutes = () => (
    <>
      <Stack.Screen name="Login" component={Login} options={screenOptions.fade} />
    </>
  )

  _renderPrivateRoutes = () => (
    <>
      <Stack.Screen name="Home" component={Home} options={screenOptions.fade} />
      <Stack.Screen name="Components" component={Components} options={screenOptions.modal} />
      <Stack.Screen name="List" component={List} options={screenOptions.modal} />
      <Stack.Screen name="ItemDetails" component={ItemDetails} options={screenOptions.card} />
    </>
  )

  render() {
    const { authStore } = this.props

    return (
      <NavigationContainer
        ref={(ref) => setTopLevelNavigator(ref)}
      >
        <Stack.Navigator
          headerMode="none"
          screenOptions={{ gestureEnabled: true }}
        >
          {authStore.loggedIn ? this._renderPrivateRoutes() : this._renderPublicRoutes()}
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default RootNavigator
