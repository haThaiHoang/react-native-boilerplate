import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TextInput, View } from 'react-native'
import memoizeOne from 'memoize-one'
import lodash from 'lodash'

import Typography from '@/components/typography'
import Touchable from '@/components/touchable'
import { Colors } from '@/theme'

const getStyles = memoizeOne((type) => {
  let container = {
    backgroundColor: 'white',
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(230,230,230)'
  }
  let input = {
    height: 36,
    fontSize: 14,
    flex: 1
  }

  const rightButton = {

  }

  if (type === 'border') {
    container = lodash.merge(container, {
      height: 40,
      paddingHorizontal: 12,
      borderWidth: 1,
      borderColor: 'rgb(177,177,177)',
      borderBottomWidth: 1,
      borderBottomColor: 'rgb(177,177,177)'
    })

    input = lodash.merge(input, {
      height: 40
    })
  }

  return {
    container,
    input,
    rightButton
  }
})

export default class Input extends Component {
  static propTypes = {
    field: PropTypes.object,
    type: PropTypes.string,
    form: PropTypes.object,
    rightButton: PropTypes.object,
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
    const { field, form, onChange, style, type, rightButton, ...props } = this.props
    const styles = getStyles(type)

    return (
      <View style={[styles.container, style]}>
        <TextInput
          value={field?.value}
          {...props}
          style={styles.input}
          onChangeText={this._handle('onChange')}
          onBlur={this._handle('onBlur')}
        />
        {rightButton && (
          <Touchable
            style={styles.rightButton}
            onPress={rightButton.onPress}
          >
            <Typography small style={{ color: Colors.BLUE }}>{rightButton.label}</Typography>
          </Touchable>
        )}
      </View>
    )
  }
}
