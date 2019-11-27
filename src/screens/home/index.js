import React from 'react'
import { View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import Screen from '@/components/screen'
import Toolbar from '@/components/toolbar'
import Button from '@/components/button'
import { navigate } from '@/utils/navigation'

const styles = EStyleSheet.create({
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

export default ({ navigation }) => {
  const items = [{
    name: 'List',
    to: 'List'
  }, {
    name: 'Typography',
    to: 'Typography'
  }]

  return (
    <Screen>
      <Toolbar title="Components" />
      <View style={styles.list}>
        {items.map((item, index) => (
          <Button
            key={index}
            style={EStyleSheet.child(styles, 'item', index, items.length)}
            onPress={() => navigation.navigate(item.to)}
          >
            {item.name}
          </Button>
        ))}
      </View>
    </Screen>
  )
}
