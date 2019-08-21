import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  list: {
    padding: 10
  },
  itemBox: {
    padding: 10,
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 4
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 20
  },
  infoBox: {
    justifyContent: 'center'
  },
  loadingBox: {
    paddingTop: 20
  }
})
