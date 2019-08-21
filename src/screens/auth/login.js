import React, { Component } from 'react'
import { ImageBackground, View, StatusBar } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { withLocalize } from 'react-localize-redux'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { Button, Input, Field } from '@/components'
import { Colors, Images } from '@/theme'
import { TYPES, actions } from '@/store/actions'
import styles from './styles'

const validationSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required()
})

@withLocalize
@connect(state => ({
  authStore: state.auth
}), {
  login: actions.login
})

class Login extends Component {
  static navigationOptions = {
    header: null
  }

  _onSubmit = (values) => {
    const { navigation, login } = this.props

    login(values, async (action, data) => {
      if (action === TYPES.LOGIN_SUCCESS) {
        navigation.navigate('Main')
        await AsyncStorage.setItem('ACCESS_TOKEN', data.accessToken)
      }
    })
  }

  _renderForm = ({ handleSubmit, ...form }) => {
    const { authStore } = this.props

    return (
      <View style={styles.form}>
        <Field
          form={form}
          name="username"
          label="Tài khoản"
          component={Input}
        />
        <Field
          form={form}
          secureTextEntry
          name="password"
          label="Mật khẩu"
          type="password"
          component={Input}
        />
        <Button
          loading={authStore.submitting === TYPES.LOGIN_REQUEST}
          style={styles.loginButton}
          onPress={handleSubmit}
          background={Colors.PRIMARY_900}
          text="Đăng nhập"
        />
        <Button
          background={Colors.ORANGE_700}
          text="Đăng ký"
        />
      </View>
    )
  }

  render() {
    return (
      <ImageBackground
        style={styles.background}
        source={Images.AUTH_BACKGROUND}
        blurRadius={1}
      >
        <StatusBar barStyle="light-content" />
        <View style={styles.mask} />
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={validationSchema}
          onSubmit={this._onSubmit}
          component={this._renderForm}
        />
      </ImageBackground>
    )
  }
}

export default Login
