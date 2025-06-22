import { HISTORY_SCREEN } from '@/constants'
import { Text } from '@/components'
import { Screen } from '@/components'

const ScreenComponent = () => {
  return (
    <Screen
      topBarProps={{
        title: "History",
      }}
      bottomTabsProps={{
        activeIndex: 1
      }}
      scrollViewKeyboardShouldPersistTaps="always"
    >
      <Text>This is History Screen</Text>
    </Screen>
  )
}

ScreenComponent.displayName = HISTORY_SCREEN

export default ScreenComponent
