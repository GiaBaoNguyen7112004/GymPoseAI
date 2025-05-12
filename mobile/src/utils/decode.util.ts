import base64 from 'react-native-base64'

export const decodeBase64Value = (base64Value: string) => {
    try {
        return base64.decode(base64Value || '') || 'unknown'
    } catch {
        return 'unknown'
    }
}
