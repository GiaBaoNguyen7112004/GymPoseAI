import * as Linking from 'expo-linking'
import {
    useFonts,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold
} from '@expo-google-fonts/poppins'
import Toast from 'react-native-toast-message'
import { ActivityIndicator, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import RootStackNavigation from './src/navigation/RootStackNavigation'
import { NavigationContainer } from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppProvider } from './src/Contexts/App.context'
import storage from './src/utils/StorageManager.util'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

const prefix = Linking.createURL('/')

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
})

storage.load()
export default function App() {
    const linking = {
        prefixes: [prefix]
    }
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
        <GestureHandlerRootView>
            <QueryClientProvider client={queryClient}>
                <AppProvider>
                    <BottomSheetModalProvider>
                        <NavigationContainer linking={linking}>
                            <RootStackNavigation />
                            <Toast />
                        </NavigationContainer>
                    </BottomSheetModalProvider>
                </AppProvider>
            </QueryClientProvider>
        </GestureHandlerRootView>
    )
}
