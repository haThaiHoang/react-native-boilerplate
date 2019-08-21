import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  form: {
    width: '100%',
    paddingHorizontal: 10
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mask: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.5
  },
  loginButton: {
    marginBottom: 10
  }
})
