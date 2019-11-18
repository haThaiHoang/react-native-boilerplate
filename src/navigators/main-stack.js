import { createStackNavigator } from 'react-navigation-stack'

import BottomTabNavigator from './bottom-tab'

const MainNavigator = createStackNavigator({
  BottomTabNavigator
}, {
  headerMode: 'none'
})

export default MainNavigator
