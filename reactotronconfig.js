// eslint-disable-next-line import/no-extraneous-dependencies
import Reactotron, { openInEditor } from 'reactotron-react-native'
import AsyncStorage from '@react-native-community/async-storage'

Reactotron
  .setAsyncStorageHandler(AsyncStorage)
  .configure()
  .useReactNative()
  .use(openInEditor())
  .connect()

// eslint-disable-next-line no-console
console.tron = {
  log: Reactotron.log
}
