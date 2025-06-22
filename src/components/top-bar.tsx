import { View, StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'

import { Box, Text } from '@/components'

export type TopBarProps = {
  title?: string
  backButton?: boolean
  showBorderBottom?: boolean
}

const TOP_BAR_HEIGHT = 44
const SAFE_AREA_TAIL = 100

const TopBar = ({
  title,
  showBorderBottom = true,
}: TopBarProps) => {
  const { t } = useTranslation()

  return (
    <View
      style={[styles.topBar]}
    >
      <View
        style={[styles.topBarInner, showBorderBottom && styles.borderBottom]}
      >
        <Box flex={1} alignItems="center">
          {!!title && (
            <Text fontWeight='bold'>
              {t(title)}
            </Text>
          )}
        </Box>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  topBar: {
    height: SAFE_AREA_TAIL + TOP_BAR_HEIGHT,
    marginTop: -SAFE_AREA_TAIL,
    borderBottomColor: 'blue',
    zIndex: 2,
    justifyContent: 'flex-end',
    backgroundColor: 'white',
  },
  topBarInner: {
    height: TOP_BAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  borderBottom: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'blue',
  },
  sideButtons: {
    width: 60,
    flexDirection: 'row',
  }
})

export default TopBar
