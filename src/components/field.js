import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { withLocalize } from 'react-localize-redux'
import lodash from 'lodash'
import { Field } from 'formik'

const styles = StyleSheet.create({
  field: {
  },
  label: {
    marginBottom: 5
  },
  error: {
    color: 'red',
    fontSize: 13,
    textAlign: 'right'
  }
})

export default withLocalize(({
  component: Component,
  translate,
  form,
  name,
  label,
  ...props
}) => {
  props = lodash.omit(props, [
    'activeLanguage',
    'addTranslation',
    'addTranslationForLanguage',
    'defaultLanguage',
    'ignoreTranslateChildren',
    'initialize',
    'languages',
    'setActiveLanguage',
    'renderToStaticMarkup'
  ])

  return (
    <View style={styles.field}>
      {label && (
        <Text style={styles.label}>{label}</Text>
      )}
      <View>
        <Field {...props} name={name} component={Component} />
        <Text
          style={styles.error}
        >
          {form.errors[name] && translate(`validation.${form.errors[name]}`)}
        </Text>
      </View>
    </View>
  )
})
