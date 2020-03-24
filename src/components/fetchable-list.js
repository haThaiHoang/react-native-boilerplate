import React, { Component } from 'react'
import { FlatList, View, Animated } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import Config from '@/configs'
import Loading from '@/components/loading'
import NoDataView from '@/components/no-data-view'
import Misc from '@/utils/misc'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

@observer
class FetchableList extends Component {
  static propTypes = {
    action: PropTypes.func,
    renderItem: PropTypes.func,
    innerRef: PropTypes.func,
    onInit: PropTypes.func,
    onFetched: PropTypes.func,
    payload: PropTypes.object,
    defaultNewPayload: PropTypes.object,
    items: PropTypes.array,
    total: PropTypes.number,
    numColumns: PropTypes.number,
    fetching: PropTypes.bool,
    animated: PropTypes.bool
  }

  constructor(props) {
    super(props)

    this.state = {
      initialing: true,
      refreshing: false,
      currentPage: 0,
      newPayload: props.defaultNewPayload || {}
    }
  }

  componentDidMount() {
    this._fetchData(() => {
      this.setState({
        initialing: false
      })
    })
  }

  _fetchData = async (onDone) => {
    const { action, payload, onInit, onFetched } = this.props
    const { newPayload } = this.state

    if (onInit) await onInit()
    const result = await action({
      ...newPayload,
      ...payload,
      offset: 0,
      limit: Config.PAGINATION_PAGE_SIZE
    })

    if (onFetched) onFetched(result)
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

  scrollToOffset = (offset) => {
    if (this._flatListComponent) {
      this._flatListComponent.getNode().scrollToOffset(offset)
    }
  }

  _onRefresh = () => {
    this.setState({
      refreshing: true
    })

    this._fetchData(() => {
      this.setState({
        refreshing: false,
        currentPage: 0
      })
    })
  }

  _onEndReached = async () => {
    const { action, payload, fetching, items, total, onFetched } = this.props
    const { currentPage, newPayload } = this.state

    if (items.length < total && !fetching) {
      const result = await action({
        ...newPayload,
        ...payload,
        concat: true,
        offset: Config.PAGINATION_PAGE_SIZE * (currentPage + 1),
        limit: Config.PAGINATION_PAGE_SIZE
      })

      if (result.success) {
        this.setState({
          currentPage: currentPage + 1
        })
      }

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


  render() {
    const {
      items,
      renderItem,
      action,
      payload,
      fetching,
      total,
      numColumns,
      animated,
      innerRef,
      ...props
    } = this.props
    const { initialing, refreshing } = this.state

    const data = numColumns > 1
      ? Misc.balanceCollumnFlatListData(items, numColumns)
      : items

    const FlatListComponent = animated ? AnimatedFlatList : FlatList

    return (
      <FlatListComponent
        {...props}
        ref={(ref) => { this._flatListComponent = ref }}
        ListEmptyComponent={initialing ? Loading : NoDataView}
        numColumns={numColumns}
        refreshing={refreshing}
        onRefresh={this._onRefresh}
        onEndReached={this._onEndReached}
        showsVerticalScrollIndicator={false}
        keyExtractor={(row, index) => index.toString()}
        data={data}
        extraData={props.extraData || data.length}
        renderItem={this._renderItem}
      />
    )
  }
}

export default FetchableList
