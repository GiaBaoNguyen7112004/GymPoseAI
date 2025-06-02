import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { User } from '@/types/user.type'
import storage from '@/utils/StorageManager.util'
import { EventRegister } from 'react-native-event-listeners'
import { httpClient } from '@/services/core/http'
import useBluetoothContext from '@/hooks/useBluetoothContext'

interface AppContextInterface {
    isAuthenticated: boolean
    profile: User | null
    setProfile: (user: User | null) => void
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
    isInitializing: boolean
}

const initialAppContext: AppContextInterface = {
    isAuthenticated: false, // Start with false until storage is loaded
    setAuthenticated: () => null,
    profile: null, // Start with null until storage is loaded
    setProfile: () => null,
    isInitializing: true // Start with true until storage is loaded
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

function AppProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false)
    const [profile, setProfile] = useState<User | null>(null)
    const [isInitializing, setIsInitializing] = useState<boolean>(true) // Initialize state from storage after storage is loaded
    const { disconnectFromDevice } = useBluetoothContext()
    useEffect(() => {
        const initializeFromStorage = async () => {
            try {
                // Wait for storage to be properly loaded
                await storage.waitForLoad()

                // Initialize HTTP client with stored tokens
                httpClient.initialize()

                // Now safely get the values
                const token = storage.getRefreshToken()
                const userProfile = storage.getProfile()

                if (token) {
                    setAuthenticated(true)
                }
                if (userProfile) {
                    setProfile(userProfile)
                }
            } catch (error) {
                console.error('Error initializing from storage:', error)
            } finally {
                // Always set initializing to false when done
                setIsInitializing(false)
            }
        }
        initializeFromStorage()
    }, [])

    useEffect(() => {
        const handleLogout = () => {
            setAuthenticated(false)
            setProfile(null)
            disconnectFromDevice()
            // Clear tokens from httpClient
            httpClient.clearAccessToken()
            httpClient.clearRefreshToken()
            // No need to set isInitializing to true on logout
            // as it's only for initial app load
        }

        // Subscribe to logout event
        const eventListener = EventRegister.addEventListener('logout', handleLogout)

        return () => {
            // Cleanup event listener
            if (typeof eventListener === 'string') {
                EventRegister.removeEventListener(eventListener)
            }
        }
    }, [disconnectFromDevice])

    const handleSetUserProfile = useCallback(
        (user: User | null) => {
            setProfile(user)
            if (user) {
                storage.saveProfile(user)
            }
        },
        [setProfile]
    )

    return (
        <AppContext.Provider
            value={{
                isAuthenticated,
                setAuthenticated,
                setProfile: handleSetUserProfile,
                profile,
                isInitializing
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider

export const useAppContext = () => {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider')
    }
    return context
}
