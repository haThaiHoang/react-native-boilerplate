import React, { Component } from 'react'
import { FlatList, Text, View, Image } from 'react-native'
import { withLocalize } from 'react-localize-redux'
import { connect } from 'react-redux'

import { Container, Icon, Toolbar } from '@/components'
import { TYPES, actions } from '@/store/actions'
import styles from './styles'

@withLocalize
@connect(state => ({
  doctorsStore: state.doctors
}), {
  getDoctors: actions.getDoctors
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
    const { getDoctors } = this.props

    // getDoctors()
  }

  _onRefresh = () => {
    const { getDoctors } = this.props

    getDoctors()
  }

  _keyExtractor = (item, index) => index.toString()

  _renderItem = ({ item }) => (
    <View style={styles.itemBox}>
      <Image
        style={styles.avatar}
        source={{ uri: item.avatar }}
      />
      <View style={styles.infoBox}>
        <Text>Tên: {item.name}</Text>
        <Text>Tuổi: {item.age}</Text>
        <Text>Địa chỉ: {item.address}</Text>
      </View>
    </View>
  )

  render() {
    const { doctorsStore } = this.props

    return (
      <Container>
        <Toolbar title="Home" />
        <FlatList
          contentContainerStyle={{ paddingBottom: 10 }}
          refreshing={doctorsStore.submitting === TYPES.GET_DOCTORS_REQUEST}
          onRefresh={this._onRefresh}
          keyExtractor={this._keyExtractor}
          style={styles.list}
          data={doctorsStore.doctors}
          extraData={this.state}
          renderItem={this._renderItem}
        />
      </Container>
    )
  }
}

export default Home
