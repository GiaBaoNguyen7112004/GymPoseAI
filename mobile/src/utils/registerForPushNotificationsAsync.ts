import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants'
import { Platform } from 'react-native'

/**
 * Checks if the device has permission for notifications
 * @returns Promise resolving to a boolean indicating if permission is granted
 */
export const checkNotificationPermission = async (): Promise<boolean> => {
    try {
        const { status } = await Notifications.getPermissionsAsync()
        return status === 'granted'
    } catch (error) {
        console.error('Error checking notification permission:', error)
        return false
    }
}

/**
 * Requests notification permission from the user
 * @returns Promise resolving to a boolean indicating if permission is granted
 */
export const requestNotificationPermission = async (): Promise<boolean> => {
    try {
        const isAlreadyGranted = await checkNotificationPermission()

        if (isAlreadyGranted) {
            return true
        }

        const { status } = await Notifications.requestPermissionsAsync()
        return status === 'granted'
    } catch (error) {
        console.error('Error requesting notification permission:', error)
        return false
    }
}

/**
 * Configures Android notification channel
 */
const configureAndroidChannel = async (): Promise<void> => {
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C'
        })
    }
}

/**
 * Gets Expo project ID from configuration
 * @returns Project ID string or null if not found
 */
const getProjectId = (): string | null => {
    const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId

    if (!projectId) {
        console.error('Project ID not found in Expo configuration')
        return null
    }

    return projectId
}

/**
 * Registers the device for push notifications and returns the push token
 * @returns Promise resolving to push token string or null if registration fails
 */
export const registerForPushNotificationsAsync = async (): Promise<string | null> => {
    try {
        // Check if running on a physical device
        if (!Device.isDevice) {
            console.warn('Push notifications require a physical device')
            return null
        }

        // Configure Android notification channel
        await configureAndroidChannel()

        // Request permission if needed
        const isPermissionGranted = await requestNotificationPermission()
        if (!isPermissionGranted) {
            console.warn('Failed to get permission for push notifications')
            return null
        }

        // Get project ID
        const projectId = getProjectId()
        if (!projectId) {
            return null
        }

        // Get push token
        const { data: pushToken } = await Notifications.getExpoPushTokenAsync({ projectId })
        return pushToken
    } catch (error) {
        console.error('Error registering for push notifications:', error)
        return null
    }
}
