import { useEffect, useState } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import 'react-native-screens'

import { emitter } from '@/utils'
import { SET_NAVIGATOR_FLOW_EMMITER } from '@/constants'
import * as SCREENS from '@/screens'
import { navigationRef } from '@/navigation/navigation-ref'
import Init from '../boot/init.tsx'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const {
  HomeScreen,
  HistoryScreen,
  LoginScreen,
} = SCREENS

const HomeTabs = () => {
  return (
    <Tab.Navigator
      tabBar={() => null}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={HomeScreen.displayName}
        component={HomeScreen}
      />
      <Tab.Screen
        name={HistoryScreen.displayName}
        component={HistoryScreen}
      />
    </Tab.Navigator>
  )
}

type TNavigatorFlow = 'login' | 'home'

const Navigators = () => {
  const [navigatorFlow, setNavigatorFlow] = useState<TNavigatorFlow | null>(null)

  useEffect(() => {
    const cb = (flow: TNavigatorFlow) => {
      setNavigatorFlow(flow)
    }

    emitter.on(SET_NAVIGATOR_FLOW_EMMITER, cb)

    return () => {
      emitter.off(SET_NAVIGATOR_FLOW_EMMITER, cb)
    }
  }, []);

  return (
    <Init setNavigatorFlow={setNavigatorFlow}>
      <>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            {navigatorFlow === 'login' && (
              <Stack.Screen
                name={LoginScreen.displayName}
                component={LoginScreen}
              />
            )}
            {navigatorFlow === 'home' && (
              <>
                <Stack.Screen
                  name="Home"
                  component={HomeTabs}
                  options={{ headerShown: false }}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </>
    </Init>
  )
}

export default Navigators
