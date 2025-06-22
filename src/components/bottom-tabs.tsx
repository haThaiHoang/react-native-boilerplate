import { useMemo } from 'react'
import { View, StyleSheet, Pressable, Text } from 'react-native'
import { useTranslation } from "react-i18next"

import { navigate } from '@/navigation/navigation-ref'
import {
  HOME_SCREEN,
  HISTORY_SCREEN,
} from '@/constants'

export type BottomTabsProps = {
  activeIndex: number
}

const BOTTOM_TABS_HEIGHT = 46
const SAFE_AREA_TAIL = 100

const BottomTabs = ({ activeIndex }: BottomTabsProps) => {
  const { t } = useTranslation()

  const TABS = useMemo(() => [{
    title: "home",
    screenName: HOME_SCREEN
  }, {
    title: "history",
    screenName: HISTORY_SCREEN,
  }], [])

  return (
    <View style={styles.bottonTabs}>
      <View style={styles.bottonTabsInner}>
        {TABS.map((tab, index) => (
          <Pressable
            key={index}
            testID={`${tab.title}_bottom_tab`}
            style={styles.menuItem}
            onPress={() => navigate(tab.screenName)}
          >
            <Text
              style={index === activeIndex && styles.titleActive}
            >
              {t(tab.title)}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bottonTabs: {
    height: SAFE_AREA_TAIL + BOTTOM_TABS_HEIGHT,
    marginBottom: -SAFE_AREA_TAIL,
    borderTopColor: 'black',
    borderTopWidth: 0.5,
    backgroundColor: "white",
  },
  bottonTabsInner: {
    height: BOTTOM_TABS_HEIGHT,
    flexDirection: "row",
  },
  menuItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleActive: {
    color: 'blue'
  }
})

export default BottomTabs
