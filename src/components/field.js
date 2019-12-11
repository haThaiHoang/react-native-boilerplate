import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'
import { Field as FormikField } from 'formik'

const styles = StyleSheet.create({
  field: {
  },
  label: {
    marginBottom: 5
  }
})

const Field = ({
  component: Component,
  name,
  label,
  ...props
}) => (
  <View style={styles.field}>
    {label && (
      <Text style={styles.label}>{label}</Text>
    )}
    <View>
      <FormikField
        {...props}
        name={name}
        component={Component}
      />
    </View>
  </View>
)

Field.propTypes = {
  component: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string
}

export default Field
