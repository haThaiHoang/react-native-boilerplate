import { LOGIN_SCREEN } from '@/constants'

import { Screen, Text } from '@/components'

const ScreenComponent = () => {
  return (
    <Screen>
      <Text>
        Login
      </Text>
    </Screen>
  )
}

ScreenComponent.displayName = LOGIN_SCREEN

export default ScreenComponent
