import { useCallback, useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { LoginManager, AccessToken } from 'react-native-fbsdk-next'

import { AppContext } from '@/Contexts/App.context'
import { oauthApi } from '@/services/rest'

export function useFacebookLogin() {
    const { setAuthenticated, setProfile } = useContext(AppContext)

    const { mutateAsync: loginWithFacebookServer } = useMutation({
        mutationFn: oauthApi.loginWithFacebook
    })

    const loginWithFacebook = useCallback(async () => {
        try {
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email'])
            if (result.isCancelled) return null

            const tokenData = await AccessToken.getCurrentAccessToken()
            if (!tokenData?.accessToken) {
                throw new Error('Failed to get access token')
            }

            const response = await loginWithFacebookServer({ access_token: tokenData.accessToken })
            const user = response.data.data.user

            setAuthenticated(true)
            setProfile(user)

            return user
        } catch (error) {
            console.error('Facebook login failed:', error)
            alert('Login failed. Please try again.')
            return null
        }
    }, [loginWithFacebookServer, setAuthenticated, setProfile])

    return { loginWithFacebook }
}
