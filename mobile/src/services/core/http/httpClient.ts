/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios'

import storage from '@/utils/StorageManager.util'
import { AuthResponse } from '@/types/auth.type'
import { refreshToken } from './refreshToken'
import { logoutGlobally } from '@/utils/auth.util'

class Http {
    instance: AxiosInstance
    private accessToken: string | null = null
    private refreshTokenRequest: Promise<string> | null = null

    constructor() {
        this.instance = axios.create({
            baseURL: process.env.EXPO_PUBLIC_API_URL,
            timeout: 10000,
            headers: { 'Content-Type': 'application/json' }
        })

        this.setupInterceptors()
    }

    // Initialize tokens from storage after storage is loaded
    initialize() {
        const storedAccessToken = storage.getAccessToken()
        if (storedAccessToken) {
            this.accessToken = storedAccessToken
        }
    }

    private setupInterceptors() {
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
            (response) => this.handleResponse(response),
            (error: AxiosError) => this.handleError(error)
        )
    }

    private handleResponse(response: any) {
        const { url } = response.config
        const data = response.data as AuthResponse

        if (url.includes(process.env.EXPO_PUBLIC_URL_LOGIN)) {
            const { access_token, refresh_token, user } = data.data
            this.accessToken = access_token
            storage.saveAccessToken(access_token)
            storage.saveRefreshToken(refresh_token)
            storage.saveProfile(user)
        }

        if (url.includes(process.env.EXPO_PUBLIC_URL_LOGOUT)) {
            logoutGlobally()
        }

        return response
    }

    private async handleError(error: AxiosError) {
        const originalRequest = error.config

        const isUnauthorized =
            error.response?.status === HttpStatusCode.Unauthorized &&
            (error.response?.data as any)?.message === 'Expired access token!'
        if (isUnauthorized && originalRequest) {
            if (!this.refreshTokenRequest) {
                this.refreshTokenRequest = refreshToken().finally(() => {
                    this.refreshTokenRequest = null
                })
            }

            try {
                const newAccessToken = await this.refreshTokenRequest
                this.accessToken = newAccessToken
                storage.saveAccessToken(newAccessToken)

                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                }

                return this.instance(originalRequest)
            } catch (refreshError) {
                return Promise.reject(refreshError)
            }
        }
        console.error('HTTP Error:', error.response?.data || error.message)
        return Promise.reject(error)
    }
    setAccessToken(token: string) {
        this.accessToken = token
        storage.saveAccessToken(token)
    }
    getAccessToken(): string | null {
        return this.accessToken || storage.getAccessToken()
    }
    clearAccessToken() {
        this.accessToken = null
        storage.saveAccessToken('')
    }
    setRefreshToken(token: string) {
        storage.saveRefreshToken(token)
    }
    getRefreshToken(): string | null {
        return storage.getRefreshToken()
    }
    clearRefreshToken() {
        storage.saveRefreshToken('')
    }
}

const httpClient = new Http()
const http = httpClient.instance

// Export both the instance and the class for initialization
export default http
export { httpClient }
