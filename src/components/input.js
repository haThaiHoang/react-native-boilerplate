import React, { Component } from 'react'
import { TextInput } from 'react-native'

import { FontSizes } from '@/theme'

const styles = {
  backgroundColor: 'white',
  borderRadius: 3,
  marginBottom: 5,
  height: 50,
  paddingHorizontal: 12,
  fontSize: FontSizes.NORMAL
}

export default class Input extends Component {
  _onChange = (value) => {
    const { field, onChange } = this.props

    if (field) field.onChange({ target: { value, name: field.name } })
    if (onChange) onChange(value)
  }

  render() {
    const { field, form, ...props } = this.props

    return (
      <TextInput
        {...field}
        {...props}
        style={styles}
        onChangeText={this._onChange}
      />
    )
  }
}
