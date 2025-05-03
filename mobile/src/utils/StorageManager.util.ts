import AsyncStorage from '@react-native-async-storage/async-storage'
import { User } from '@/types/user.type'

class StorageManager {
    private static instance: StorageManager
    private accessToken: string | null = null
    private refreshToken: string | null = null
    private userProfile: User | null = null
    private allowNotification: boolean | null = null

    private constructor() {}

    static getInstance(): StorageManager {
        if (!StorageManager.instance) {
            StorageManager.instance = new StorageManager()
        }
        return StorageManager.instance
    }

    async load(): Promise<void> {
        try {
            this.accessToken = await AsyncStorage.getItem('access_token')
            this.refreshToken = await AsyncStorage.getItem('refresh_token')
            const user = await AsyncStorage.getItem('user')
            this.userProfile = user ? JSON.parse(user) : null
            const allowNotification = await AsyncStorage.getItem('allowNotification')
            this.allowNotification = allowNotification !== null ? allowNotification === 'true' : null
        } catch (error) {
            console.error('Error loading storage:', error)
        }
    }

    getAccessToken(): string | null {
        return this.accessToken
    }

    getRefreshToken(): string | null {
        return this.refreshToken
    }

    getProfile(): User | null {
        return this.userProfile
    }

    getAllowNotification(): boolean | null {
        return this.allowNotification
    }

    async saveAccessToken(token: string): Promise<void> {
        this.accessToken = token
        try {
            await AsyncStorage.setItem('access_token', token)
        } catch (error) {
            console.error('Error saving access token:', error)
        }
    }

    async saveRefreshToken(token: string): Promise<void> {
        this.refreshToken = token
        try {
            await AsyncStorage.setItem('refresh_token', token)
        } catch (error) {
            console.error('Error saving refresh token:', error)
        }
    }

    async saveProfile(user: User): Promise<void> {
        this.userProfile = user
        try {
            await AsyncStorage.setItem('user', JSON.stringify(user))
        } catch (error) {
            console.error('Error saving profile:', error)
        }
    }

    async saveAllowNotification(value: boolean): Promise<void> {
        this.allowNotification = value
        try {
            await AsyncStorage.setItem('allowNotification', value.toString())
        } catch (error) {
            console.error('Error saving allowNotification:', error)
        }
    }

    async clearStorage(): Promise<void> {
        this.accessToken = null
        this.refreshToken = null
        this.userProfile = null
        this.allowNotification = null
        try {
            await AsyncStorage.multiRemove(['access_token', 'refresh_token', 'user', 'allowNotification'])
        } catch (error) {
            console.error('Error clearing storage:', error)
        }
    }
}

export default StorageManager.getInstance()
