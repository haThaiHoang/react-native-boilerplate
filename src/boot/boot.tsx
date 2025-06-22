import 'react-native-gesture-handler';
import React from 'react'
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';

import Store from '@/store/store'
import Navigators from '@/navigation/navigators'

const Boot = () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <Store>
      <Navigators />
    </Store>
  </ApplicationProvider>
)

export default Boot
