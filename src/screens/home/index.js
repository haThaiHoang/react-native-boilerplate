import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, StyleSheet } from 'react-native'

import Screen from '@/components/screen'
import Toolbar from '@/components/toolbar'

const styles = StyleSheet.create({
})

export default () => (
  <Screen>
    <Toolbar title="Components" />
    <Text>ád</Text>
  </Screen>
)
