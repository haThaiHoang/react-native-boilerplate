import React from 'react'

import Store from '@/store'
import Init from './init'
import Navigation from './navigation'

export default () => (
  <Store>
    <Init />
    <Navigation />
  </Store>
)
