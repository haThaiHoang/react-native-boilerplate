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
    onChange: PropTypes.func,
    onBlur: PropTypes.func
  }

  _handle = (type) => (value) => {
    const { field } = this.props
    // eslint-disable-next-line react/destructuring-assignment
    const handle = this.props[type]

    if (field) field[type](field.name)(value)
    if (handle) handle(value)
  }

  render() {
    const { field, form, onChange, style, ...props } = this.props

    return (
      <TextInput
        value={field.value}
        {...props}
        style={[styles, style]}
        onChangeText={this._handle('onChange')}
        onBlur={this._handle('onBlur')}
      />
    )
  }
}
