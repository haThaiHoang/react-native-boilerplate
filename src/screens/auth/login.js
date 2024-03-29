import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StatusBar, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { inject, observer } from 'mobx-react'
import { Formik } from 'formik'
import * as Yup from 'yup'

import Request from '@/utils/request'
import Screen from '@/components/screen'
import Container from '@/components/container'
import Button from '@/components/button'
import Input from '@/components/input'
import Field from '@/components/field'
import MaskLoader from '@/components/mask-loader'

const styles = StyleSheet.create({
  form: {
    width: '100%',
    flex: 1,
    justifyContent: 'center'
  },
  loginButton: {
    marginBottom: 10
  },
  fieldGroup: {
    paddingBottom: 10
  }
})

const validationSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required()
})

@inject((stores) => ({
  authStore: stores.auth
}))
@observer
class Login extends Component {
  static propTypes = {
    authStore: PropTypes.object.isRequired
  }

  _onSubmit = async (values) => {
    const { authStore } = this.props

    MaskLoader.show()

    const { success, data } = await authStore.login(values)

    if (success) {
      Request.setAccessToken(data.token)
      await AsyncStorage.setItem('ACCESS_TOKEN', data.token)
    }

    MaskLoader.hide()
  }

  _renderForm = ({ handleSubmit, isValid }) => (
    <View style={styles.form}>
      <View style={styles.fieldGroup}>
        <Field
          name="username"
          label="Username"
          component={Input}
        />
        <Field
          secureTextEntry
          name="password"
          label="Password"
          type="password"
          component={Input}
        />
      </View>
      <Button
        disabled={!isValid}
        style={styles.loginButton}
        onPress={handleSubmit}
        text="Login"
      />
    </View>
  )

  render() {
    return (
      <Screen>
        <StatusBar barStyle="dark-content" />
        <Container full>
          <Formik
            initialValues={{}}
            initialErrors={{
              username: 'required',
              password: 'required'
            }}
            validationSchema={validationSchema}
            onSubmit={this._onSubmit}
            component={this._renderForm}
          />
        </Container>
      </Screen>
    )
  }
}

export default Login
