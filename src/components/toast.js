import { Toast } from 'native-base'

const style = {
  position: 'absolute',
  top: 20,
  left: 0,
  right: 0,
  borderRadius: 0
}

export default class {
  static warning(text, duration) {
    Toast.show({
      duration: duration || 1500,
      style,
      position: 'top',
      type: 'danger',
      text,
      buttonText: 'Ok'
    })
  }

  static error(text, duration) {
    Toast.show({
      duration: duration || 1500,
      style,
      position: 'top',
      type: 'danger',
      text,
      buttonText: 'Ok'
    })
  }

  static show(text, duration) {
    Toast.show({
      duration: duration || 1500,
      style,
      position: 'top',
      text,
      buttonText: 'Ok'
    })
  }
}
