import { useCallback } from 'react'
import { LoginManager, AccessToken } from 'react-native-fbsdk-next'

export function useFacebookLogin() {
    const loginWithFacebook = useCallback(async () => {
        try {
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email'])

            if (result.isCancelled) {
                console.log('Login cancelled')
                return null
            }

            const data = await AccessToken.getCurrentAccessToken()

            if (!data) {
                console.log('Failed to get access token')
                return null
            }

            return data.accessToken.toString()
        } catch (error) {
            console.error('Facebook login failed:', error)
            return null
        }
    }, [])

    return { loginWithFacebook }
}
