import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'

import Screen from '@/components/screen'
import Toolbar from '@/components/toolbar'
import Typography from '@/components/typography'
import Thumbnail from '@/components/thumbnail'

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    padding: 20
  },
  avatar: {
    marginBottom: 20
  }
})

class ItemDetailsScreen extends Component {
  static propTypes = {
    route: PropTypes.object
  }

  state = {}

  render() {
    const { route } = this.props
    const { product } = route.params

    return (
      <Screen>
        <Toolbar
          back
          title={product.name}
        />
        <View style={styles.content}>
          <Thumbnail
            style={styles.avatar}
            rounded
            url={product.avatar}
            size={100}
          />
          <Typography>{product.description}</Typography>
        </View>
      </Screen>
    )
  }
}

export default ItemDetailsScreen
