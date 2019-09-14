import React, { Component } from 'react'
import { View, StatusBar, StyleSheet } from 'react-native'
// import AsyncStorage from '@react-native-community/async-storage'
import { withLocalize } from 'react-localize-redux'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { Button, Input, Field } from '@/components'
import { Colors } from '@/theme'
import { TYPES, actions } from '@/store/actions'

const styles = StyleSheet.create({
  form: {
    width: '100%',
    paddingHorizontal: 10
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray'
  },
  loginButton: {
    marginBottom: 10
  }
})


const validationSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required()
})

@withLocalize
@connect((state) => ({
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

    // login(values, async (action, data) => {
    //   if (action === TYPES.LOGIN_SUCCESS) {
    //     navigation.navigate('Main')
    //     await AsyncStorage.setItem('ACCESS_TOKEN', data.accessToken)
    //   }
    // })

    navigation.navigate('Main')
  }

  _renderForm = ({ handleSubmit, ...form }) => {
    const { authStore } = this.props

    return (
      <View style={styles.form}>
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
        <Button
          loading={authStore.submitting === TYPES.LOGIN_REQUEST}
          style={styles.loginButton}
          onPress={handleSubmit}
          background={Colors.PRIMARY_900}
          text="Login"
        />
      </View>
    )
  }

  render() {
    return (
      <View
        style={styles.container}
      >
        <StatusBar barStyle="light-content" />
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={validationSchema}
          onSubmit={this._onSubmit}
          component={this._renderForm}
        />
      </View>
    )
  }
}

export default Login
