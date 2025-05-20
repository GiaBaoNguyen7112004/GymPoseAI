import { Alert } from 'react-native'
import { errorMessages } from '@/constants/errorMessages'

export function showErrorAlert({
    statusCode,
    message: serverMessage
}: {
    statusCode: keyof typeof errorMessages | 'default'
    message?: string
}) {
    const hasServerMessage = Boolean(serverMessage)

    if (hasServerMessage) return Alert.alert('Error', serverMessage, [{ text: 'OK' }])
    const { title, message } = errorMessages[statusCode] ?? errorMessages.default
    Alert.alert(title, message, [{ text: 'OK' }])
}
