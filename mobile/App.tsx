import {
    useFonts,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold
} from '@expo-google-fonts/poppins'
import { ActivityIndicator, View } from 'react-native'
import { Provider } from 'react-redux'
import { RootStackNavigation } from '@/src/navigations'
import { store } from '@/src/store'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

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
        <GestureHandlerRootView>
            <Provider store={store}>
                <RootStackNavigation />
            </Provider>
        </GestureHandlerRootView>
    )
}
