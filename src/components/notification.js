import { Alert } from 'react-native'

class Notification {
  static success(text) {
    Alert.alert(text)
  }

  static warning(text) {
    Alert.alert(text)
  }

  static async error(text) {
    Alert.alert(text)
  }
}

export default Notification
