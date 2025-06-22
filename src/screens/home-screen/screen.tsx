import { HOME_SCREEN } from '@/constants'
import { Text } from '@/components'
import { Screen } from '@/components'

const ScreenComponent = () => {
  return (
    <Screen
      topBarProps={{
        title: "Home",
      }}
      bottomTabsProps={{
        activeIndex: 0
      }}
      scrollViewKeyboardShouldPersistTaps="always"
    >
      <Text>This is Home Screen</Text>
    </Screen>
  )
}

ScreenComponent.displayName = HOME_SCREEN

export default ScreenComponent
