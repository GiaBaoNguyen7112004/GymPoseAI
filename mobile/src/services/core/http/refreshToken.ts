/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from 'axios'

import storage from '@/utils/StorageManager.util'
import { RefreshTokenResponse } from '@/types/auth.type'
import { logoutGlobally } from '@/utils/auth.util'

export const refreshToken = async (): Promise<string> => {
    const refresh_token = storage.getRefreshToken()
    if (!refresh_token) {
        logoutGlobally()
    }
    const baseURL = process.env.EXPO_PUBLIC_API_URL
    const apiUrl = process.env.EXPO_PUBLIC_URL_REFRESH_TOKEN
    try {
        const res = await axios.post<RefreshTokenResponse>(baseURL + apiUrl, { refresh_token })
        const { access_token } = res.data.data
        await storage.saveAccessToken(access_token)
        return access_token
    } catch (error) {
        console.error('Error refreshing token:', error)
        logoutGlobally()
        throw (error as AxiosError).response
    }
}
