import React, { Component } from 'react'
import { View, StatusBar, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import * as Yup from 'yup'

import Screen from '@/components/screen'
import Container from '@/components/container'
import Button from '@/components/button'
import Input from '@/components/input'
import Field from '@/components/field'
import { TYPES, actions } from '@/store/actions'

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

@connect((state) => ({
  authStore: state.auth
}), {
  login: actions.login
})

class Login extends Component {
  _onSubmit = (values) => {
    const { navigation, login } = this.props

    login(values, async (success, data) => {
      if (success) {
        navigation.navigate('Main')
        await AsyncStorage.setItem('ACCESS_TOKEN', data.token)
      }
    })
  }

  _renderForm = ({ handleSubmit, ...form }) => {
    const { authStore } = this.props

    return (
      <View style={styles.form}>
        <View style={styles.fieldGroup}>
          <Field
            form={form}
            name="username"
            label="Username"
            component={Input}
          />
          <Field
            form={form}
            secureTextEntry
            name="password"
            label="Password"
            type="password"
            component={Input}
          />
        </View>
        <Button
          loading={authStore.submitting === TYPES.LOGIN_REQUEST}
          style={styles.loginButton}
          onPress={handleSubmit}
          text="Login"
        />
      </View>
    )
  }

  render() {
    return (
      <Screen>
        <StatusBar barStyle="dark-content" />
        <Container full>
          <Formik
            validateOnChange={false}
            validateOnBlur={false}
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
