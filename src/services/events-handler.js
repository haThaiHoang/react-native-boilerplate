import { Alert } from 'react-native'

import { navigate } from '@/utils/navigation'
import {
} from './events'

function onFirebaseMessageReceived(notification) {
  const { notificationType } = notification.data

  switch (notificationType) {
    case 'RESET_LIST':
      // resetVideos.emit(notification)
      break
    default:
  }
}

const onFirebasenNotificationOpened = async ({ notification: { data } }) => {
  const { notificationType } = data

  switch (notificationType) {
    case 'OPEN_LIST':
      navigate('List')
      break
    default:
  }
}

function eventsHandler(register) {
  register('firebase:on_notification', onFirebaseMessageReceived)
  register('firebase:on_notification_opened', onFirebasenNotificationOpened)
}

export default eventsHandler
