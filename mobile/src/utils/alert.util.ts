import { Alert } from 'react-native'
import { errorMessages } from '@/constants/errorMessages'

export function showErrorAlert(statusCode: keyof typeof errorMessages | 'default') {
    const { title, message } = errorMessages[statusCode] ?? errorMessages.default
    Alert.alert(title, message, [{ text: 'OK' }])
}
