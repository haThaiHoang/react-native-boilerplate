import { Input, Button } from '@ui-kitten/components'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { LOGIN_SCREEN, SET_NAVIGATOR_FLOW_EMMITER } from '@/constants'
import { Screen, Text, Box, Space } from '@/components'
import { emitter } from '@/utils'
import { authApi } from '@/store'

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required()
})

const { useLoginMutation } = authApi

const ScreenComponent = () => {
  const [login, { isLoading }] = useLoginMutation()

  const formik = useFormik<{ email: string, password: string }>({
    validateOnMount: false,
    validateOnChange: false,
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values): Promise<void> => {
      const result = await login(values)

      if (result.data) {
        emitter.emit(SET_NAVIGATOR_FLOW_EMMITER, 'home')
      }
    }
  });

  return (
    <Screen>
      <Box padding={20}>
        <Text fontWeight='bold' align='center'>Boilerplate App</Text>
        <Space size={20} />
        <Input
          label="Email"
          placeholder='Enter your email'
          value={formik.values.email}
          onChangeText={(value) => formik.setFieldValue('email', value)}
          caption={formik.errors.email}
        />
        <Space size={16} />
        <Input
          label="Password"
          placeholder='Enter your password'
          secureTextEntry
          value={formik.values.password}
          onChangeText={(value) => formik.setFieldValue('password', value)}
          caption={formik.errors.password}
        />
        <Space size={16} />
        <Button
          onPress={() => formik.handleSubmit()}
        >
          {!isLoading ? 'Login' : 'Login...'}
        </Button>
      </Box>

    </Screen>
  )
}

ScreenComponent.displayName = LOGIN_SCREEN

export default ScreenComponent
