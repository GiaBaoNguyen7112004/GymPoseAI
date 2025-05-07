import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationProvider } from './src/Contexts/NotificationContext'
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
import { AppProvider } from './src/Contexts/App.context'

import storage from './src/utils/StorageManager.util'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { toastFitnessXConfig } from './src/config/toast.config'
import BlankScreenLoader from './src/components/BlankScreenLoader'
import * as Notifications from 'expo-notifications'

const prefix = Linking.createURL('/')
const linking = {
    prefixes: [prefix]
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
                        <BottomSheetModalProvider>
                            <NavigationContainer linking={linking}>
                                <StatusBar backgroundColor='#FFFFFF' barStyle='dark-content' />
                                <RootStackNavigation />
                            </NavigationContainer>
                        </BottomSheetModalProvider>
                        <Toast config={toastFitnessXConfig} />
                    </NotificationProvider>
                </AppProvider>
            </QueryClientProvider>
        </GestureHandlerRootView>
    )
}
