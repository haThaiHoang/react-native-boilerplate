import React, { Component } from 'react'
import { FlatList, Text, View, Image, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import Screen from '@/components/screen'
import Toolbar from '@/components/toolbar'
import { actions } from '@/store/actions'

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

@connect((state) => ({
  productsStore: state.products
}), {
  getProducts: actions.getProducts
})

class Home extends Component {
  state = {
    loadingType: null
  }

  componentDidMount() {
    this._onFetchData('init')
  }

  _onFetchData = (loadingType) => {
    const { getProducts } = this.props

    this.setState({
      loadingType
    })

    getProducts(null, () => {
      this.setState({
        loadingType: null
      })
    })
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

  _renderContent = () => {
    const { productsStore } = this.props
    const { loadingType } = this.state

    return (
      <FlatList
        refreshing={loadingType === 'refresh'}
        onRefresh={() => this._onFetchData('refresh')}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
        contentContainerStyle={{ paddingBottom: 15 }}
        data={productsStore.products}
        renderItem={this._renderItem}
      />
    )
  }

  render() {
    return (
      <Screen>
        <Toolbar title="Products" />
        {this._renderContent()}
      </Screen>
    )
  }
}

export default Home
