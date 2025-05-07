import { createContext, useState } from 'react'
import { User } from '@/types/user.type'
import storage from '@/utils/StorageManager.util'
interface AppContextInterface {
    isAuthenticated: boolean
    profile: User | null
    setProfile: React.Dispatch<React.SetStateAction<User | null>>
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
    ipCamera?: string
    setIpCamera: React.Dispatch<React.SetStateAction<string | undefined>>
}

const initialAppContext: AppContextInterface = {
    isAuthenticated: Boolean(storage.getRefreshToken()),
    setAuthenticated: () => null,
    profile: storage.getProfile(),
    setProfile: () => null,
    setIpCamera: () => null
}
export const AppContext = createContext<AppContextInterface>(initialAppContext)

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
    const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
    const [ipCamera, setIpCamera] = useState<string | undefined>(undefined)
    return (
        <AppContext.Provider
            value={{
                isAuthenticated,
                setAuthenticated,
                setProfile,
                profile,
                ipCamera,
                setIpCamera
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
