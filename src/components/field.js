import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Field } from 'formik'

const styles = StyleSheet.create({
  field: {
  },
  label: {
    marginBottom: 5
  }
})

export default ({
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
      <Field {...props} name={name} component={Component} />
    </View>
  </View>
)
