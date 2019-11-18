import { createStackNavigator } from 'react-navigation-stack'

import Login from '@/screens/auth/login'

const AuthNavigator = createStackNavigator({
  Login
}, {
  headerMode: 'none'
})

export default AuthNavigator
