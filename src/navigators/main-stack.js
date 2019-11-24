import { createStackNavigator } from 'react-navigation-stack'

import BottomTabNavigator from './bottom-tab'
import List from '@/screens/list'

const MainNavigator = createStackNavigator({
  BottomTabNavigator,
  List
}, {
  headerMode: 'none'
})

export default MainNavigator
