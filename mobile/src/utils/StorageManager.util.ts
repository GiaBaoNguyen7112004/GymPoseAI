import AsyncStorage from '@react-native-async-storage/async-storage'
import { User } from '@/types/user.type'
import StorageKeys from '@/constants/StorageKeys'
import { PeripheralType } from '@/types/peripheral.type'

class StorageManager {
    private static instance: StorageManager
    private accessToken: string | null = null
    private refreshToken: string | null = null
    private userProfile: User | null = null
    private allowNotification: boolean | null = null
    private pushToken: string | null = null
    private Peripheral: PeripheralType | null = null

    private constructor() {}

    static getInstance(): StorageManager {
        if (!StorageManager.instance) {
            StorageManager.instance = new StorageManager()
        }
        return StorageManager.instance
    }

    async load(): Promise<void> {
        try {
            this.accessToken = await AsyncStorage.getItem(StorageKeys.ACCESS_TOKEN)
            this.refreshToken = await AsyncStorage.getItem(StorageKeys.REFRESH_TOKEN)
            const user = await AsyncStorage.getItem(StorageKeys.USER)
            this.userProfile = user ? JSON.parse(user) : null
            const allowNotification = await AsyncStorage.getItem(StorageKeys.ALLOW_NOTIFICATION)
            this.allowNotification = allowNotification !== null ? allowNotification === 'true' : null
            this.pushToken = await AsyncStorage.getItem(StorageKeys.PUSH_TOKEN)
            const peripheral = await AsyncStorage.getItem(StorageKeys.PERIPHERAL)
            this.Peripheral = peripheral ? JSON.parse(peripheral) : null
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

    getPushToken(): string | null {
        return this.pushToken
    }
    getPeripheral(): PeripheralType | null {
        return this.Peripheral
    }

    async saveAccessToken(token: string): Promise<void> {
        this.accessToken = token
        try {
            await AsyncStorage.setItem(StorageKeys.ACCESS_TOKEN, token)
        } catch (error) {
            console.error('Error saving access token:', error)
        }
    }

    async saveRefreshToken(token: string): Promise<void> {
        this.refreshToken = token
        try {
            await AsyncStorage.setItem(StorageKeys.REFRESH_TOKEN, token)
        } catch (error) {
            console.error('Error saving refresh token:', error)
        }
    }

    async saveProfile(user: User): Promise<void> {
        this.userProfile = user
        try {
            await AsyncStorage.setItem(StorageKeys.USER, JSON.stringify(user))
        } catch (error) {
            console.error('Error saving profile:', error)
        }
    }

    async saveAllowNotification(value: boolean): Promise<void> {
        this.allowNotification = value
        try {
            await AsyncStorage.setItem(StorageKeys.ALLOW_NOTIFICATION, value.toString())
        } catch (error) {
            console.error('Error saving allowNotification:', error)
        }
    }

    async savePushToken(token: string): Promise<void> {
        this.pushToken = token
        try {
            await AsyncStorage.setItem(StorageKeys.PUSH_TOKEN, token)
        } catch (error) {
            console.error('Error saving push token:', error)
        }
    }
    async savePeripheral(peripheral: PeripheralType | null): Promise<void> {
        this.Peripheral = peripheral
        try {
            await AsyncStorage.setItem(StorageKeys.PERIPHERAL, JSON.stringify(peripheral))
        } catch (error) {
            console.error('Error saving peripheral:', error)
        }
    }

    async clearStorage(): Promise<void> {
        this.accessToken = null
        this.refreshToken = null
        this.userProfile = null
        this.allowNotification = null
        this.pushToken = null
        this.Peripheral = null

        try {
            await AsyncStorage.multiRemove([
                StorageKeys.ACCESS_TOKEN,
                StorageKeys.REFRESH_TOKEN,
                StorageKeys.USER,
                StorageKeys.ALLOW_NOTIFICATION,
                StorageKeys.PUSH_TOKEN,
                StorageKeys.PERIPHERAL
            ])
        } catch (error) {
            console.error('Error clearing storage:', error)
        }
    }
}

export default StorageManager.getInstance()
