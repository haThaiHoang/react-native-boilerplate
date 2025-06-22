import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native'

import { isIos } from '@/utils'
import { Box } from '@/components'
import TopBar from './top-bar'
import type { TopBarProps } from './top-bar'
import BottomTabs from './bottom-tabs'
import type { BottomTabsProps } from './bottom-tabs'

type Props = {
  children: React.ReactNode
  scrollable?: boolean
  topBarProps?: TopBarProps
  bottomTabsProps?: BottomTabsProps
  bottomBanner?: React.ReactNode
  scrollViewKeyboardShouldPersistTaps?: boolean | 'always' | 'handled' | 'never'
}

const Screen = ({
  children,
  scrollable = true,
  topBarProps,
  bottomTabsProps,
  bottomBanner,
  scrollViewKeyboardShouldPersistTaps = 'handled'
}: Props) => {

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.keyboardAvoidingView}
      >
        {topBarProps && (
          <TopBar
            {...topBarProps}
          />
        )}
        {scrollable ? (
          <ScrollView
            style={styles.scrollView}
            keyboardShouldPersistTaps={scrollViewKeyboardShouldPersistTaps}
          >
            {children}
          </ScrollView>
        ) : (
          <Box flex={1}>
            {children}
          </Box>
        )}
      </KeyboardAvoidingView>
      {bottomBanner}
      {bottomTabsProps && (
        <BottomTabs
          {...bottomTabsProps}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white'
  },
  keyboardAvoidingView: { flex: 1 },
  scrollView: {
    overflow: isIos ? 'visible' : 'hidden'
  },
  blurBackground: {
    top: 0,
    left: 0,
    right: 0,
    height: 500,
    position: 'absolute',
  },
})

export default Screen
