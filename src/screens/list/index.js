import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FlatList, Text, View, Image, StyleSheet, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import Screen from '@/components/screen'
import Toolbar from '@/components/toolbar'
import Loading from '@/components/loading'
import { actions } from '@/store/actions'

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

@withTranslation()
@connect((state) => ({
  productsStore: state.products
}), {
  getProducts: actions.getProducts
})


class List extends Component {
  static propTypes = {
    productsStore: PropTypes.object.isRequired,
    getProducts: PropTypes.func.isRequired
  }

  state = {
    loadingType: null,
    page: 0
  }

  _isMounted = true

  componentDidMount() {
    this._onFetchData('init')
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  _onFetchData = (loadingType, merge) => {
    const { getProducts, productsStore } = this.props
    const { page } = this.state
    const { products } = productsStore

    if (loadingType === 'load-more' && products.items.length >= products.total) return

    this.setState({
      loadingType
    })

    getProducts({
      merge
    }, (success) => {
      if (this._isMounted) {
        this.setState({
          loadingType: null,
          page: success && merge ? page + 1 : 0
        })
      }
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

  _renderFooter = () => {
    const { loadingType } = this.state

    if (loadingType === 'load-more') {
      return (
        <ActivityIndicator />
      )
    }

    return null
  }

  _renderContent = () => {
    const { productsStore } = this.props
    const { loadingType } = this.state

    if (loadingType === 'init') {
      return <Loading />
    }

    return (
      <FlatList
        refreshing={loadingType === 'refresh'}
        onRefresh={() => this._onFetchData('refresh')}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
        contentContainerStyle={{ paddingBottom: 15 }}
        data={productsStore.products.items}
        renderItem={this._renderItem}
        ListFooterComponent={this._renderFooter}
        onEndReached={() => this._onFetchData('load-more', true)}
      />
    )
  }

  render() {
    return (
      <Screen>
        <Toolbar title="List" />
        {this._renderContent()}
      </Screen>
    )
  }
}

export default List
