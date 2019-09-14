import React from 'react'

import Init from './init'
import Store from '@/store'
import Navigation from './navigation'

export default () => (
  <Store>
    <Init />
    <Navigation />
  </Store>
)
