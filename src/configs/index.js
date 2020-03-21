import Config from 'react-native-config'

import DefaultConfig from './default.json'

console.log(Config)
export default {
  ...DefaultConfig,
  ...Config
}
