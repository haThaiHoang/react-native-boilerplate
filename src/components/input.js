import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TextInput } from 'react-native'

import { FontSizes } from '@/theme'

const styles = {
  backgroundColor: 'white',
  borderRadius: 3,
  height: 50,
  paddingHorizontal: 12,
  borderWidth: 1,
  borderColor: 'black',
  fontSize: FontSizes.NORMAL
}

export default class Input extends Component {
  static propTypes = {
    field: PropTypes.object,
    form: PropTypes.object,
    onChange: PropTypes.func
  }

  _onChange = (value) => {
    const { field, onChange } = this.props

    if (field) field.onChange({ target: { value, name: field.name } })
    if (onChange) onChange(value)
  }

  render() {
    const { field, form, onChange, style, ...props } = this.props

    return (
      <TextInput
        {...field}
        {...props}
        style={[styles, style]}
        onChangeText={this._onChange}
      />
    )
  }
}
