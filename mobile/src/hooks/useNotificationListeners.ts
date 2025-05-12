import { useRef, useCallback, useEffect } from 'react'
import * as Notifications from 'expo-notifications'

export default function useNotificationListeners(onNotification: (n: Notifications.Notification) => void) {
    const notificationListener = useRef<Notifications.Subscription>()
    const responseListener = useRef<Notifications.Subscription>()

    const setup = useCallback(() => {
        notificationListener.current = Notifications.addNotificationReceivedListener(onNotification)
        responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
            // Handle response, optional callback
        })
    }, [onNotification])

    const cleanup = useCallback(() => {
        if (notificationListener.current) {
            Notifications.removeNotificationSubscription(notificationListener.current)
        }
        if (responseListener.current) {
            Notifications.removeNotificationSubscription(responseListener.current)
        }
    }, [])

    useEffect(() => cleanup, [cleanup])

    return { setup, cleanup }
}
