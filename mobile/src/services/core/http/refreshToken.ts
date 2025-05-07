/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from 'axios'

import storage from '@/utils/StorageManager.util'
import { RefreshTokenResponse } from '@/types/auth.type'

export const refreshToken = async (): Promise<string> => {
    const refresh_token = storage.getRefreshToken()
    if (!refresh_token) {
        storage.clearStorage()
        throw new Error('No refresh token available')
    }

    try {
        const res = await axios.post<RefreshTokenResponse>(process.env.EXPO_PUBLIC_URL_REFRESH_TOKEN, { refresh_token })
        const { access_token, refresh_token: new_refresh_token } = res.data.data
        storage.saveAccessToken(access_token)
        storage.saveRefreshToken(new_refresh_token)
        return access_token
    } catch (error) {
        storage.clearStorage()
        throw (error as AxiosError).response
    }
}
