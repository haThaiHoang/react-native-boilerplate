import React, { PureComponent } from 'react'
import { FlatList, View, Animated, ActivityIndicator, StyleSheet, RefreshControl } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import Config from '@/configs'
import Loading from '@/components/loading'
import NoDataView from '@/components/no-data-view'
import Misc from '@/utils/misc'

const styles = StyleSheet.create({
  footerBox: {
    height: 60,
    justifyContent: 'center'
  }
})

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

@observer
class FetchableList extends PureComponent {
  static propTypes = {
    action: PropTypes.func,
    renderItem: PropTypes.func,
    innerRef: PropTypes.func,
    onInit: PropTypes.func,
    onRefresh: PropTypes.func,
    onFetched: PropTypes.func,
    keyExtractor: PropTypes.func,
    payload: PropTypes.object,
    defaultNewPayload: PropTypes.object,
    items: PropTypes.array,
    total: PropTypes.number,
    progressViewOffset: PropTypes.number,
    numColumns: PropTypes.number,
    animated: PropTypes.bool
  }

  constructor(props) {
    super(props)

    this.state = {
      initialing: true,
      refreshing: false,
      loadingMore: false,
      currentPage: 0,
      newPayload: props.defaultNewPayload || {}
    }

    this._preventReadchedFetchCurrentPage = 0
  }

  componentDidMount() {
    this._fetchData(() => {
      this.setState({
        initialing: false
      })
    })
  }

  _fetchData = async (onDone) => {
    const { action, payload, onInit, onRefresh, onFetched } = this.props
    const { newPayload, initialing, refreshing } = this.state

    if (onInit && initialing) await onInit()
    if (onRefresh && !initialing && refreshing) await onRefresh()
    const result = await action({
      ...newPayload,
      ...payload,
      offset: 0,
      limit: Config.PAGINATION_PAGE_SIZE
    })

    if (onFetched) onFetched(result, initialing)
    if (onDone) onDone()
  }

  fetchDataWithNewPayload = (newPayload = {}) => {
    this.state.newPayload = newPayload
    this._fetchData(() => {
      this.setState({
        currentPage: 0
      })
    })
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

  _onRefresh = () => {
    this.setState({
      refreshing: true
    }, () => {
      this._fetchData(() => {
        this.setState({
          refreshing: false,
          currentPage: 0
        })
      })
    })
  }

  _onEndReached = async () => {
    const { action, payload, items, total, onFetched } = this.props
    const { currentPage, newPayload } = this.state

    if (items.length < total && !this._isReachedFetching) {
      this._isReachedFetching = true

      this.setState({
        loadingMore: true
      })

      const result = await action({
        ...newPayload,
        ...payload,
        concat: true,
        offset: Config.PAGINATION_PAGE_SIZE * (currentPage + 1),
        limit: Config.PAGINATION_PAGE_SIZE
      })

      this.setState({
        currentPage: result.success ? currentPage + 1 : currentPage,
        loadingMore: false
      })

      this._isReachedFetching = false
      if (onFetched) onFetched(result)
    }
  }

  _renderItem = ({ item, index }) => {
    const { renderItem } = this.props

    if (item.empty) {
      return <View style={{ flex: 1 }} />
    }

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
      innerRef,
      onRefresh,
      keyExtractor,
      progressViewOffset,
      ...props
    } = this.props
    const { initialing, refreshing } = this.state

    let data = []

    if (!initialing) {
      data = numColumns > 1
        ? Misc.balanceCollumnFlatListData(items, numColumns)
        : items
    }

    const FlatListComponent = animated ? AnimatedFlatList : FlatList

    return (
      <FlatListComponent
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
        keyExtractor={keyExtractor || ((row, index) => index.toString())}
        data={data}
        extraData={props.extraData || data.length}
        renderItem={this._renderItem}
      />
    )
  }
}

export default FetchableList
