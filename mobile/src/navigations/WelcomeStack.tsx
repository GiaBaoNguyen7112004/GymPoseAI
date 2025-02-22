import WelcomeScreen from '@/src/screens/Auth/Welcome/welcomeStep1'
import WelcomeStep2 from '@/src/screens/Auth/Welcome/welcomeStep2'
import WelcomeStep3 from '@/src/screens/Auth/Welcome/welcomeStep3'
import { createStackNavigator } from '@react-navigation/stack'

export type WelcomeStackParamList = {
    WelcomeStep1: undefined
    WelcomeStep2: undefined
    WelcomeStep3: undefined
}

const Stack = createStackNavigator<WelcomeStackParamList>()

const WelcomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='WelcomeStep1' component={WelcomeScreen} />
            <Stack.Screen name='WelcomeStep2' component={WelcomeStep2} />
            <Stack.Screen name='WelcomeStep3' component={WelcomeStep3} />
        </Stack.Navigator>
    )
}

export default WelcomeStack
