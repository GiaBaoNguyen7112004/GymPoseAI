import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react'
import * as Notifications from 'expo-notifications'
import { registerForPushNotificationsAsync } from '@/utils/registerForPushNotificationsAsync'
import StorageManager from '@/utils/StorageManager.util'
import { Alert } from 'react-native'

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

    const notificationListener = useRef<Notifications.Subscription>()
    const responseListener = useRef<Notifications.Subscription>()

    // Request notification permissions
    const requestNotificationPermission = async (): Promise<boolean> => {
        try {
            const { status: existingStatus } = await Notifications.getPermissionsAsync()

            if (existingStatus === 'granted') {
                return true
            }

            const { status } = await Notifications.requestPermissionsAsync()
            return status === 'granted'
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to request notification permission'
            setError(errorMessage)
            return false
        }
    }

    // Setup notification listeners
    const setupNotificationListeners = () => {
        notificationListener.current = Notifications.addNotificationReceivedListener(setNotification)
        responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
            // Handle user interaction with notification
            // console.log('Notification interaction:', response)
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

    // Initialize push notifications
    const initializePushNotifications = async () => {
        try {
            // Get stored notification permission
            const storedPermission = await StorageManager.getAllowNotification()
            const shouldEnableNotifications = storedPermission !== null ? storedPermission : true
            setAllowNotificationState(shouldEnableNotifications)

            // If notifications should be enabled, request permission and register
            if (shouldEnableNotifications) {
                const isGranted = await requestNotificationPermission()
                if (isGranted) {
                    const token = await registerForPushNotificationsAsync()
                    setExpoPushToken(token)
                    await StorageManager.saveAllowNotification(true)
                    setupNotificationListeners()
                } else {
                    setAllowNotificationState(false)
                    await StorageManager.saveAllowNotification(false)
                }
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to initialize push notifications'
            setError(errorMessage)
        }
    }

    // Set allow notification state
    const setAllowNotification = async (value: boolean): Promise<void> => {
        try {
            if (value === false) {
                // Disable notifications
                Alert.alert('Notifications Disabled', 'You will no longer receive new notifications.', [{ text: 'OK' }])
                setAllowNotificationState(false)
                await StorageManager.saveAllowNotification(false)
                cleanupNotificationListeners()
            } else {
                // Enable notifications
                const isGranted = await requestNotificationPermission()
                if (!isGranted) {
                    Alert.alert('Notifications Denied', 'Please go to settings to enable notifications for this app.')
                    setAllowNotificationState(false)
                    await StorageManager.saveAllowNotification(false)
                    return
                }

                const token = await registerForPushNotificationsAsync()
                setExpoPushToken(token)
                setAllowNotificationState(true)
                await StorageManager.saveAllowNotification(true)
                setupNotificationListeners()
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to update notification settings'
            setError(errorMessage)
        }
    }

    // Initialize on component mount
    useEffect(() => {
        initializePushNotifications()

        // Cleanup on unmount
        return () => {
            cleanupNotificationListeners()
        }
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
