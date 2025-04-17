/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL, URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN, URL_REGISTER } from '@env'
import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios'
import storage from '@/utils/StorageManager.util'
import { AuthResponse, RefreshTokenResponse } from '@/types/auth.type'

class Http {
    instance: AxiosInstance
    private refreshTokenRequest: Promise<string> | null
    private accessToken: string | null

    constructor() {
        this.accessToken = storage.getAccessToken()
        this.instance = axios.create({
            baseURL: API_URL,
            timeout: 10000,
            headers: { 'Content-Type': 'application/json' }
        })
        this.refreshTokenRequest = null

        this.instance.interceptors.request.use(
            (config) => {
                if (this.accessToken && config.headers) {
                    config.headers.Authorization = `Bearer ${this.accessToken}`
                }
                return config
            },
            (error) => Promise.reject(error)
        )

        this.instance.interceptors.response.use(
            (response) => {
                const { url } = response.config
                if (url === URL_LOGIN || url === URL_REGISTER) {
                    const { access_token, refresh_token, user } = (response.data as AuthResponse).data
                    this.accessToken = access_token
                    storage.saveAccessToken(access_token)
                    storage.saveRefreshToken(refresh_token)
                    storage.saveProfile(user)
                } else if (url === URL_LOGOUT) {
                    storage.clearStorage()
                }
                return response
            },
            async (error: AxiosError) => {
                const originalRequest = error.config

                if (
                    error.response?.status === HttpStatusCode.Unauthorized &&
                    (error.response?.data as any)?.message === 'Unauthorized' &&
                    originalRequest
                ) {
                    if (!this.refreshTokenRequest) {
                        this.refreshTokenRequest = refreshToken().finally(() => {
                            this.refreshTokenRequest = null
                        })
                    }

                    try {
                        const access_token = await this.refreshTokenRequest
                        this.accessToken = access_token
                        storage.saveAccessToken(access_token)
                        originalRequest.headers.Authorization = `Bearer ${access_token}`
                        return this.instance(originalRequest)
                    } catch (errorRefreshToken) {
                        return Promise.reject(errorRefreshToken)
                    }
                }

                if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
                    const message = (error.response?.data as any)?.message || error.message
                    console.log(message)
                    return Promise.reject(error)
                }
                return Promise.reject(error)
            }
        )
    }
}

const http = new Http().instance

const refreshToken = async (): Promise<string> => {
    const refresh_token = storage.getRefreshToken()
    if (!refresh_token) {
        storage.clearStorage()
        throw new Error('No refresh token available')
    }

    try {
        const res = await http.post<RefreshTokenResponse>(URL_REFRESH_TOKEN, { refresh_token })
        const { access_token, refresh_token: new_refresh_token } = res.data.data
        await storage.saveAccessToken(access_token)
        await storage.saveRefreshToken(new_refresh_token)
        return access_token
    } catch (error) {
        storage.clearStorage()
        throw (error as AxiosError).response
    }
}

export default http
