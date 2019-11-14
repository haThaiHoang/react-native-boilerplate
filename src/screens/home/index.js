import React, { Component } from 'react'
import { FlatList, Text, View, Image, StyleSheet } from 'react-native'
import { withLocalize } from 'react-localize-redux'
import { connect } from 'react-redux'

import Screen from '@/components/screen'
import Icon from '@/components/icon'
import Toolbar from '@/components/toolbar'
import { TYPES, actions } from '@/store/actions'

const styles = StyleSheet.create({
  list: {
    padding: 15
  },
  itemBox: {
    padding: 10,
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 4
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 20
  },
  infoBox: {
    justifyContent: 'center'
  },
  loadingBox: {
    paddingTop: 20
  }
})


@withLocalize
@connect((state) => ({
  productsStore: state.products
}), {
  getProducts: actions.getProducts
})

class Home extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name="block"
        color={tintColor}
        size={26}
      />
    )
  }

  componentDidMount() {
    this._onFetchData()
  }

  _onFetchData = () => {
    const { getProducts } = this.props

    getProducts()
  }

  _renderItem = ({ item }) => (
    <View style={styles.itemBox}>
      <Image
        style={styles.avatar}
        source={{ uri: item.avatar }}
      />
      <View style={styles.infoBox}>
        <Text>Name: {item.name}</Text>
        <Text>Description: {item.description}</Text>
      </View>
    </View>
  )

  render() {
    const { productsStore } = this.props

    return (
      <Screen>
        <Toolbar title="Products" />
        <FlatList
          contentContainerStyle={{ paddingBottom: 15 }}
          refreshing={productsStore.submitting === TYPES.GET_PRODUCTS_REQUEST}
          onRefresh={this._onFetchData}
          keyExtractor={(item, index) => index.toString()}
          style={styles.list}
          data={productsStore.products}
          renderItem={this._renderItem}
        />
      </Screen>
    )
  }
}

export default Home
