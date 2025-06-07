import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react'
import * as Notifications from 'expo-notifications'
import { useMutation } from '@tanstack/react-query'
import { Alert } from 'react-native'

import { FCMApi } from '@/services/rest'
import useAppContext from '@/hooks/useAppContext'
import useNotificationListeners from '@/hooks/useNotificationListeners'
import { usePushToken } from '@/hooks/usePushToken'
import StorageManager from '@/utils/StorageManager.util'
import { handleErrorWrapper } from '@/utils/errorHandler'

interface NotificationContextType {
    expoPushToken: string | null
    notification: Notifications.Notification | null
    error: string | null
    allowNotification: boolean
    setAllowNotification: (value: boolean, showToast?: boolean) => Promise<void>
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

interface NotificationProviderProps {
    children: ReactNode
}

function NotificationProvider({ children }: NotificationProviderProps) {
    const [expoPushToken, setExpoPushToken] = useState<string | null>(null)
    const [notification, setNotification] = useState<Notifications.Notification | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [allowNotification, setAllowNotificationState] = useState<boolean>(() => {
        const stored = StorageManager.getAllowNotification()
        return stored !== null ? stored : true
    })

    const handleError = handleErrorWrapper(setError)
    const { isAuthenticated } = useAppContext()
    const { setup, cleanup } = useNotificationListeners(setNotification)
    const { initializePushToken } = usePushToken(handleError)

    const { mutateAsync: registerFCMMutateAsync } = useMutation({
        mutationFn: FCMApi.registerFCMToken
    })

    const { mutateAsync: deleteFCMMutateAsync } = useMutation({
        mutationFn: FCMApi.deleteFCMToken
    })

    const registerWithBackend = useCallback(
        async (token: string) => {
            try {
                await registerFCMMutateAsync({ push_token: token })
                await StorageManager.savePushToken(token)
            } catch (err) {
                handleError(err, 'Failed to register push token with backend')
            }
        },
        [registerFCMMutateAsync, handleError]
    )

    const unregisterFromBackend = useCallback(
        async (token: string) => {
            if (!token) return
            try {
                await deleteFCMMutateAsync({ push_token: token })
                await StorageManager.savePushToken('')
            } catch (err) {
                handleError(err, 'Failed to unregister push token from backend')
            }
        },
        [deleteFCMMutateAsync, handleError]
    )

    const setAllowNotification = useCallback(
        async (value: boolean, showToast: boolean = true) => {
            try {
                setAllowNotificationState(value)
                await StorageManager.saveAllowNotification(value)

                if (!value && expoPushToken) {
                    await unregisterFromBackend(expoPushToken)
                    cleanup()
                    if (isAuthenticated && showToast) {
                        Alert.alert('Notifications Disabled', 'You will no longer receive notifications.')
                    }
                } else if (value && isAuthenticated && expoPushToken) {
                    await registerWithBackend(expoPushToken)
                    setup()
                }
            } catch (err) {
                handleError(err, 'Failed to update notification settings')
            }
        },
        [expoPushToken, isAuthenticated, cleanup, setup, registerWithBackend]
    )

    useEffect(() => {
        ;(async () => {
            const { token, permissionGranted } = await initializePushToken()
            if (permissionGranted && token) {
                setExpoPushToken(token)
                setup()
            } else {
                setAllowNotificationState(false)
            }
        })()
    }, [])

    useEffect(() => {
        if (isAuthenticated && allowNotification && expoPushToken) {
            registerWithBackend(expoPushToken)
        } else if (expoPushToken && !allowNotification) {
            unregisterFromBackend(expoPushToken)
        }
    }, [isAuthenticated, allowNotification, expoPushToken])

    useEffect(() => cleanup, [cleanup])

    return (
        <NotificationContext.Provider
            value={{
                expoPushToken,
                notification,
                error,
                allowNotification,
                setAllowNotification
            }}
        >
            {children}
        </NotificationContext.Provider>
    )
}

export default NotificationProvider
