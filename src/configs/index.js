import Config from 'react-native-config'

import DefaultConfig from './default.json'
alert(Config.API_URL)
export default {
  ...DefaultConfig,
  ...Config
}
