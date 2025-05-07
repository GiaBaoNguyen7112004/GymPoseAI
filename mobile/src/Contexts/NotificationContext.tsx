import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react'
import * as Notifications from 'expo-notifications'
import {
    registerForPushNotificationsAsync,
    requestNotificationPermission
} from '@/utils/registerForPushNotificationsAsync'
import StorageManager from '@/utils/StorageManager.util'
import { Alert } from 'react-native'
import { useMutation } from '@tanstack/react-query'
import { FCMApi } from '@/services/rest'
import { AppContext } from './App.context'

interface NotificationContextType {
    expoPushToken: string | null
    notification: Notifications.Notification | null
    error: string | null
    allowNotification: boolean
    setAllowNotification: (value: boolean) => Promise<void>
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const useNotification = () => {
    const context = useContext(NotificationContext)
    if (context === undefined) {
        throw new Error('useNotification must be used within a NotificationProvider')
    }
    return context
}

interface NotificationProviderProps {
    children: ReactNode
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
    const [expoPushToken, setExpoPushToken] = useState<string | null>(null)
    const [notification, setNotification] = useState<Notifications.Notification | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [allowNotification, setAllowNotificationState] = useState<boolean>(true)
    const { isAuthenticated } = useContext(AppContext)
    const { mutateAsync: registerFCMMutateAsync } = useMutation({
        mutationFn: FCMApi.registerFCMToken
    })
    const { mutateAsync: deleteFCMMutateAsync } = useMutation({
        mutationFn: FCMApi.deleteFCMToken
    })

    const notificationListener = useRef<Notifications.Subscription>()
    const responseListener = useRef<Notifications.Subscription>()

    // Handle errors consistently
    const handleError = (err: unknown, fallbackMessage: string): string => {
        const errorMessage = err instanceof Error ? err.message : fallbackMessage
        setError(errorMessage)
        return errorMessage
    }

    // Setup notification listeners
    const setupNotificationListeners = () => {
        notificationListener.current = Notifications.addNotificationReceivedListener(setNotification)
        responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
            // Handle user interaction with notification
            // For future implementation
        })
    }

    // Cleanup notification listeners
    const cleanupNotificationListeners = () => {
        if (notificationListener.current) {
            Notifications.removeNotificationSubscription(notificationListener.current)
        }
        if (responseListener.current) {
            Notifications.removeNotificationSubscription(responseListener.current)
        }
    }

    // Register for push notifications
    const registerForNotifications = async (): Promise<boolean> => {
        try {
            const token = await registerForPushNotificationsAsync()
            setExpoPushToken(token)
            if (!token) {
                throw new Error('Failed to get push token')
            }
            if (isAuthenticated) await registerFCMMutateAsync({ push_token: token })
            await StorageManager.savePushToken(token)
            return true
        } catch (err) {
            handleError(err, 'Failed to register for push notifications')
            return false
        }
    }

    // Initialize push notifications
    const initializePushNotifications = async () => {
        try {
            // Get stored notification preference
            const storedPushToken = await StorageManager.getPushToken()
            setExpoPushToken(storedPushToken)
            const storedPermission = await StorageManager.getAllowNotification()
            const shouldEnableNotifications = storedPermission !== null ? storedPermission : true
            setAllowNotificationState(shouldEnableNotifications)

            // If notifications should be enabled, request permission and register
            if (shouldEnableNotifications) {
                const isGranted = await requestNotificationPermission()

                if (isGranted) {
                    const registered = await registerForNotifications()
                    if (registered) {
                        await StorageManager.saveAllowNotification(true)
                        setupNotificationListeners()
                    }
                } else {
                    setAllowNotificationState(false)
                    await StorageManager.saveAllowNotification(false)
                }
            } else {
            }
        } catch (err) {
            handleError(err, 'Failed to initialize push notifications')
        }
    }

    // Set allow notification state
    const setAllowNotification = async (value: boolean): Promise<void> => {
        try {
            if (!value) {
                if (isAuthenticated && expoPushToken) {
                    await deleteFCMMutateAsync({ push_token: expoPushToken })
                }
                // Disable notifications
                Alert.alert('Notifications Disabled', 'You will no longer receive new notifications.', [{ text: 'OK' }])
                setAllowNotificationState(false)
                await StorageManager.saveAllowNotification(false)
                cleanupNotificationListeners()
                return
            }

            // Enable notifications
            const isGranted = await requestNotificationPermission()
            if (!isGranted) {
                Alert.alert('Notifications Denied', 'Please go to settings to enable notifications for this app.')
                setAllowNotificationState(false)
                await StorageManager.saveAllowNotification(false)
                return
            }

            const registered = await registerForNotifications()
            if (registered) {
                setAllowNotificationState(true)
                await StorageManager.saveAllowNotification(true)
                setupNotificationListeners()
            }
        } catch (err) {
            handleError(err, 'Failed to update notification settings')
        }
    }

    // Initialize on component mount
    useEffect(() => {
        initializePushNotifications()

        // Cleanup on unmount
        return cleanupNotificationListeners
    }, [])

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
