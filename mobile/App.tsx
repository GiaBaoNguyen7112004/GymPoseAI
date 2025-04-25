import React from 'react'
import { View, ActivityIndicator, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'
import * as Linking from 'expo-linking'

// Font Poppins
import {
    useFonts,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold
} from '@expo-google-fonts/poppins'

// Navigation & Contexts
import RootStackNavigation from './src/navigation/RootStackNavigation'
import { AppProvider } from './src/Contexts/App.context'

// Utils
import storage from './src/utils/StorageManager.util'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { toastFitnessXConfig } from './src/config/toast.config'

// Khởi tạo linking
const prefix = Linking.createURL('/')
const linking = {
    prefixes: [prefix]
}

// Khởi tạo queryClient
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
})

// Load local storage
storage.load()

export default function App() {
    const [fontsLoaded] = useFonts({
        Poppins_Light: Poppins_300Light,
        Poppins_Regular: Poppins_400Regular,
        Poppins_Medium: Poppins_500Medium,
        Poppins_SemiBold: Poppins_600SemiBold,
        Poppins_Bold: Poppins_700Bold
    })

    if (!fontsLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' color='#9DCEFF' />
            </View>
        )
    }
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <QueryClientProvider client={queryClient}>
                <AppProvider>
                    <BottomSheetModalProvider>
                        <NavigationContainer linking={linking}>
                            <StatusBar backgroundColor='#FFFFFF' barStyle='dark-content' />
                            <RootStackNavigation />
                        </NavigationContainer>
                    </BottomSheetModalProvider>
                    <Toast config={toastFitnessXConfig} />
                </AppProvider>
            </QueryClientProvider>
        </GestureHandlerRootView>
    )
}
