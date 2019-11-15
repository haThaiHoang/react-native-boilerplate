import React from 'react'
import icoMoonConfig from 'iconmoon'
import createIconSetFromIcoMoon from '@/utils/create-icon-set-from-icomoon'

const Icon = createIconSetFromIcoMoon(icoMoonConfig)
export default (props) => <Icon {...props} />
