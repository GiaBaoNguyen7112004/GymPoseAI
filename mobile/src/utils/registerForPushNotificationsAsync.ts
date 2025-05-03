import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants'
import { Platform } from 'react-native'

/**
 * Registers the device for push notifications and returns the push token
 * @returns Push token string or null if registration fails
 */
export async function registerForPushNotificationsAsync(): Promise<string | null> {
    try {
        // Configure Android notification channel
        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C'
            })
        }

        // Check if running on a physical device
        if (!Device.isDevice) {
            console.warn('Push notifications require a physical device')
            return null
        }

        // Check and request permissions
        const { status: existingStatus } = await Notifications.getPermissionsAsync()
        let finalStatus = existingStatus

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync()
            finalStatus = status
        }

        if (finalStatus !== 'granted') {
            console.warn('Failed to get permission for push notifications')
            return null
        }

        // Get project ID from Expo config
        const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId

        if (!projectId) {
            console.error('Project ID not found in Expo configuration')
            return null
        }

        // Get push token
        const { data: pushToken } = await Notifications.getExpoPushTokenAsync({
            projectId
        })

        console.log('Push token:', pushToken)
        return pushToken
    } catch (error) {
        console.error('Error registering for push notifications:', error)
        return null
    }
}
