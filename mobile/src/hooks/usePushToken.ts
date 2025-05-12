import { useCallback } from 'react'
import {
    registerForPushNotificationsAsync,
    requestNotificationPermission
} from '@/utils/registerForPushNotificationsAsync'
import StorageManager from '@/utils/StorageManager.util'

export function usePushToken(handleError: (err: unknown, fallback: string) => string) {
    const initializePushToken = useCallback(async (): Promise<{
        token: string | null
        permissionGranted: boolean
    }> => {
        try {
            const storedToken = StorageManager.getPushToken()
            if (storedToken) {
                return { token: storedToken, permissionGranted: true }
            }

            const isGranted = await requestNotificationPermission()
            if (!isGranted) return { token: null, permissionGranted: false }

            const token = await registerForPushNotificationsAsync()
            if (!token) throw new Error('Failed to get push token')

            await StorageManager.savePushToken(token)
            await StorageManager.saveAllowNotification(true)

            return { token, permissionGranted: true }
        } catch (err) {
            handleError(err, 'Failed to initialize push notifications')
            return { token: null, permissionGranted: false }
        }
    }, [handleError])

    return { initializePushToken }
}
