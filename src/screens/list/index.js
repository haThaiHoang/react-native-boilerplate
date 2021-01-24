import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, StyleSheet } from 'react-native'
import { inject, observer } from 'mobx-react'

import Screen from '@/components/screen'
import Toolbar from '@/components/toolbar'
import Touchable from '@/components/touchable'
import Thumbnail from '@/components/thumbnail'
import FetchableList from '@/components/fetchable-list'
import { navigate } from '@/utils/navigation'

const styles = StyleSheet.create({
  list: {
    padding: 15
  },
  itemBox: {
    padding: 10,
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 4
  },
  avatar: {
    marginRight: 20
  },
  infoBox: {
    justifyContent: 'center'
  },
  loadingBox: {
    paddingTop: 20
  }
})

@inject((stores) => ({
  productsStore: stores.products
}))
@observer
class List extends Component {
  static propTypes = {
    productsStore: PropTypes.object.isRequired
  }

  _onItemPress = (item) => {
    navigate('ItemDetails', {
      product: item
    })
  }

  _renderItem = ({ item }) => (
    <Touchable
      style={styles.itemBox}
      onPress={() => this._onItemPress(item)}
    >
      <Thumbnail
        size={70}
        rounded
        style={styles.avatar}
        url={item.avatar}
      />
      <View style={styles.infoBox}>
        <Text>ID: {item.id}</Text>
        <Text>Name: {item.name}</Text>
        <Text>Description: {item.description}</Text>
      </View>
    </Touchable>
  )

  _renderContent = () => {
    const { productsStore } = this.props

    return (
      <FetchableList
        keyExtractor={(item, index) => index}
        contentContainerStyle={styles.list}
        action={productsStore.getProducts}
        items={productsStore.products.items}
        page={productsStore.products.page}
        total={productsStore.products.total}
        renderItem={this._renderItem}
      />
    )
  }

  render() {
    return (
      <Screen>
        <Toolbar
          back
          title="List"
        />
        {this._renderContent()}
      </Screen>
    )
  }
}

export default List
