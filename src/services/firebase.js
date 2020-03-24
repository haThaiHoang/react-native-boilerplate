// import { Alert } from 'react-native'
// import AsyncStorage from '@react-native-community/async-storage'
// import firebase from 'react-native-firebase'
//
// import eventsHandler from './events-handler'
//
// const getToken = async () => {
//   const fcmToken = await firebase.messaging().getToken()
//   if (fcmToken) {
//     await AsyncStorage.setItem('FCM_TOKEN', fcmToken)
//   }
// }
//
// const requestNotificationPermission = async () => {
//   await firebase.messaging().requestPermission()
//   getToken()
// }
//
// const checkPermission = async (finish) => {
//   const enabled = await firebase.messaging().hasPermission()
//   if (enabled) {
//     getToken()
//   } else {
//     requestNotificationPermission()
//   }
//
//   finish()
// }
//
// const createNotificationListeners = async () => {
//   eventsHandler((event, handler) => {
//     if (event === 'firebase:on_notification') {
//       firebase.notifications().onNotification(handler)
//     }
//
//     if (event === 'firebase:on_notification_opened') {
//       firebase.notifications().onNotificationOpened(handler)
//     }
//   })
// }

const initFirebase = () => new Promise((resolve) => {
  // try {
  //   checkPermission(() => {
  //     createNotificationListeners()
  //     resolve()
  //   })
  // } catch (e) {
  //   Alert.alert('Init firebase failed')
  //   resolve()
  // }

  // If your project is using firebase: remove this line below and open all the commented lines above
  resolve()
})

export {
  initFirebase
}
