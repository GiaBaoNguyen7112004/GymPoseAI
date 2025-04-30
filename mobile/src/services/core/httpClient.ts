/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios'

import storage from '@/utils/StorageManager.util'
import { AuthResponse } from '@/types/auth.type'
import { refreshToken } from './refreshToken'

console.log('API URL:', process.env.EXPO_PUBLIC_API_URL)

class Http {
    instance: AxiosInstance
    private accessToken: string | null
    private refreshTokenRequest: Promise<string> | null

    constructor() {
        this.accessToken = storage.getAccessToken()
        this.refreshTokenRequest = null

        this.instance = axios.create({
            baseURL: process.env.EXPO_PUBLIC_API_URL,
            timeout: 10000,
            headers: { 'Content-Type': 'application/json' }
        })

        this.setupInterceptors()
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

        if (url === process.env.EXPO_PUBLIC_URL_LOGIN || url === process.env.EXPO_PUBLIC_URL_REGISTER) {
            const { access_token, refresh_token, user } = data.data
            this.accessToken = access_token
            storage.saveAccessToken(access_token)
            storage.saveRefreshToken(refresh_token)
            storage.saveProfile(user)
        }

        if (url === process.env.EXPO_PUBLIC_URL_LOGOUT) {
            storage.clearStorage()
        }

        return response
    }

    private async handleError(error: AxiosError) {
        const originalRequest = error.config

        const isUnauthorized =
            error.response?.status === HttpStatusCode.Unauthorized &&
            (error.response?.data as any)?.message === 'Unauthorized'

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

        return Promise.reject(error)
    }
}

const http = new Http().instance

export default http
