import { AppRegistry } from 'react-native'
import App from '@/boot'
import { name as appName } from './app.json'

AppRegistry.registerComponent(appName, () => App)

// eslint-disable-next-line no-undef
if (__DEV__) {
  import('./reactotronconfig')
} else {
  // eslint-disable-next-line no-console
  console.tron = {
    log: () => null
  }
}
