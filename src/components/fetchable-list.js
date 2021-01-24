import React, { PureComponent } from 'react'
import { FlatList, View, ActivityIndicator, StyleSheet, RefreshControl } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import Configs from '@/configs'
import Loading from '@/components/loading'
import NoDataView from '@/components/no-data-view'

const styles = StyleSheet.create({
  footerBox: {
    height: 60,
    justifyContent: 'center'
  }
})

@observer
class FetchableList extends PureComponent {
  static propTypes = {
    renderItem: PropTypes.func.isRequired,
    keyExtractor: PropTypes.func.isRequired,
    action: PropTypes.func.isRequired,
    payload: PropTypes.object,
    items: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    onFetched: PropTypes.func,
    progressViewOffset: PropTypes.number,
    numColumns: PropTypes.number,
    animated: PropTypes.bool
  }

  state = {
    initialing: true,
    refreshing: false,
    loadingMore: false,
    newPayload: {}
  }

  async componentDidMount() {
    await this._fetchData(0)

    this.setState({
      initialing: false
    })
  }

  _fetchData = async (page, concat) => {
    const { action, onFetched, payload } = this.props
    const { newPayload } = this.state

    const result = await action({
      offset: (page) * Configs.PAGINATION_PAGE_SIZE,
      limit: Configs.PAGINATION_PAGE_SIZE,
      ...payload,
      ...newPayload
    }, { page, concat })

    if (onFetched) {
      onFetched(result, { page })
    }
  }

  fetchDataWithNewPayload = async (newPayload = {}) => {
    this.state.newPayload = newPayload

    await this._fetchData(0)
  }

  scrollToOffset = (params) => {
    const { animated } = this.props

    if (this._flatListComponent) {
      if (animated) {
        this._flatListComponent.getNode().scrollToOffset(params)
      } else {
        this._flatListComponent.scrollToOffset(params)
      }
    }
  }

  _onRefresh = async () => {
    this.setState({ refreshing: true })

    await this._fetchData(0)

    this.setState({ refreshing: false })
  }

  _onEndReached = async () => {
    const { items, total, page } = this.props
    const { loadingMore } = this.state

    if (total > items.length && !loadingMore) {
      this.setState({
        loadingMore: true
      })

      await this._fetchData(page + 1, true)

      this.setState({
        loadingMore: false
      })
    }
  }

  _renderItem = ({ item, index }) => {
    const { renderItem } = this.props

    return renderItem({ item, index })
  }

  _renderFooter = () => {
    const { loadingMore } = this.state

    return loadingMore && (
      <View style={styles.footerBox}>
        <ActivityIndicator />
      </View>
    )
  }

  render() {
    const {
      items,
      renderItem,
      action,
      payload,
      total,
      numColumns,
      animated,
      progressViewOffset,
      ...props
    } = this.props
    const { initialing, refreshing } = this.state

    return (
      <FlatList
        {...props}
        refreshControl={(
          <RefreshControl
            progressViewOffset={progressViewOffset}
            refreshing={refreshing}
            onRefresh={this._onRefresh}
          />
        )}
        ref={(ref) => { this._flatListComponent = ref }}
        ListEmptyComponent={initialing ? Loading : () => <NoDataView inverted={props.inverted} />}
        numColumns={numColumns}
        onEndReached={this._onEndReached}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={this._renderFooter}
        data={items}
        renderItem={this._renderItem}
      />
    )
  }
}

export default FetchableList
