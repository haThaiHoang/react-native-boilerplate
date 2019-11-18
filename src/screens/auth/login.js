import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StatusBar, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { showMessage } from 'react-native-flash-message'

import Screen from '@/components/screen'
import Container from '@/components/container'
import Button from '@/components/button'
import Input from '@/components/input'
import Field from '@/components/field'
import { TYPES, actions } from '@/store/actions'
import navigation from '@/utils/navigation'

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
  static propTypes = {
    authStore: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired
  }

  _onSubmit = (values) => {
    const { login } = this.props

    login(values, async (success, data) => {
      if (success) {
        await AsyncStorage.setItem('ACCESS_TOKEN', data.token)
        navigation.navigate('Main')

        showMessage({
          message: 'Login success',
          type: 'info'
        })
      }
    })
  }

  _renderForm = ({ handleSubmit }) => {
    const { authStore } = this.props

    return (
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
