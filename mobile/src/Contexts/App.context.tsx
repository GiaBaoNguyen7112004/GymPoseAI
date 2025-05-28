import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@/types/user.type'
import storage from '@/utils/StorageManager.util'
import { EventRegister } from 'react-native-event-listeners'

interface AppContextInterface {
    isAuthenticated: boolean
    profile: User | null
    setProfile: React.Dispatch<React.SetStateAction<User | null>>
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}
const token = storage.getRefreshToken()

const initialAppContext: AppContextInterface = {
    isAuthenticated: Boolean(token),
    setAuthenticated: () => null,
    profile: storage.getProfile(),
    setProfile: () => null
}
export const AppContext = createContext<AppContextInterface>(initialAppContext)

function AppProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
    const [profile, setProfile] = useState<User | null>(initialAppContext.profile)

    // Sync with storage after it's loaded (fixes issue after app restart)
    useEffect(() => {
        const syncWithStorage = () => {
            const token = storage.getRefreshToken()
            const userProfile = storage.getProfile()

            if (token && !isAuthenticated) {
                setAuthenticated(true)
            }
            if (userProfile && !profile) {
                setProfile(userProfile)
            }
        }

        // Small delay to ensure storage.load() has completed
        const timer = setTimeout(syncWithStorage, 100)
        return () => clearTimeout(timer)
    }, [isAuthenticated, profile])

    useEffect(() => {
        const handleLogout = () => {
            setAuthenticated(false)
            setProfile(null)
        }

        // Subscribe to logout event
        const eventListener = EventRegister.addEventListener('logout', handleLogout)

        return () => {
            // Cleanup event listener
            if (typeof eventListener === 'string') {
                EventRegister.removeEventListener(eventListener)
            }
        }
    }, [])

    return (
        <AppContext.Provider
            value={{
                isAuthenticated,
                setAuthenticated,
                setProfile,
                profile
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider
