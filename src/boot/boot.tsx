import 'react-native-gesture-handler';
import React from 'react'

import Store from '@/store/store'
import Navigators from '@/navigation/navigators'

const Boot = () => (
  <Store>
    <Navigators />
  </Store>
)

export default Boot
