import React from 'react'

import Init from './init'
import Store from '@/store'
import Navigators from '@/navigators'

export default () => (
  <Store>
    <Init />
    <Navigators />
  </Store>
)
