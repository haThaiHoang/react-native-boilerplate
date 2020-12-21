import React from 'react'
import { View } from 'react-native'
import StyleSheet from 'react-native-extended-stylesheet'

import Screen from '@/components/screen'
import Toolbar from '@/components/toolbar'
import Container from '@/components/container'
import Button from '@/components/button'
import { navigate } from '@/utils/navigation'

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15
  },
  list: {
    padding: 15
  },
  item: {
    marginBottom: 10
  },
  'item:last-child': {
    marginBottom: 0
  }
})

export default () => {
  const items = [{
    name: 'List',
    to: 'List'
  }, {
    name: 'Settings',
    to: 'Settings'
  }]

  return (
    <Screen>
      <Toolbar title="Components" />
      <Container style={styles.container}>
        <View style={styles.list}>
          {items.map((item, index) => (
            <Button
              key={index}
              style={StyleSheet.child(styles, 'item', index, items.length)}
              onPress={() => navigate(item.to)}
            >
              {item.name}
            </Button>
          ))}
        </View>
      </Container>
    </Screen>
  )
}
