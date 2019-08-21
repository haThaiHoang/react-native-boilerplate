import { StyleSheet } from 'react-native'

import { Colors } from '@/theme'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY_500,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 50
  }
})
