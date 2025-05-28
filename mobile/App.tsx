import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'
import * as Linking from 'expo-linking'

import {
    useFonts,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold
} from '@expo-google-fonts/poppins'

import RootStackNavigation from './src/navigation/RootStackNavigation'
import NotificationProvider from './src/Contexts/NotificationContext'
import AppProvider from './src/Contexts/App.context'
import BlueToothProvider from './src/Contexts/BluetoothContext'

import storage from './src/utils/StorageManager.util'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { toastFitnessXConfig } from './src/config/toast.config'
import BlankScreenLoader from './src/components/BlankScreenLoader'
import * as Notifications from 'expo-notifications'
import { useAppContext } from './src/Contexts/App.context'

const prefix = Linking.createURL('/')
const linking = {
    prefixes: ['gymposeai-dev://', 'https://gymposeai-dev.com'],
    screens: {
        Home: 'home',
        Login: 'login',
        Register: 'register',
        verifyAccount: {
            path: 'verify-account/:account_verification_token',
            parse: {
                account_verification_token: (token: string) => `${token}`
            }
        }
    }
}

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
})

storage.load()

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true
    })
})

// Component wrapper để sử dụng AppContext
function AppContent() {
    const { isInitializing } = useAppContext()

    if (isInitializing) {
        return <BlankScreenLoader />
    }

    return (
        <NavigationContainer linking={linking}>
            <StatusBar backgroundColor='#FFFFFF' barStyle='dark-content' />
            <RootStackNavigation />
        </NavigationContainer>
    )
}

export default function App() {
    const [fontsLoaded] = useFonts({
        Poppins_Light: Poppins_300Light,
        Poppins_Regular: Poppins_400Regular,
        Poppins_Medium: Poppins_500Medium,
        Poppins_SemiBold: Poppins_600SemiBold,
        Poppins_Bold: Poppins_700Bold
    })

    if (!fontsLoaded) {
        return <BlankScreenLoader />
    }
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <QueryClientProvider client={queryClient}>
                <AppProvider>
                    <NotificationProvider>
                        <BlueToothProvider>
                            <BottomSheetModalProvider>
                                <AppContent />
                            </BottomSheetModalProvider>
                            <Toast config={toastFitnessXConfig} />
                        </BlueToothProvider>
                    </NotificationProvider>
                </AppProvider>
            </QueryClientProvider>
        </GestureHandlerRootView>
    )
}
