import WelcomeScreen from '@/src/screens/Auth/Welcome/welcomeStep1'
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
        </Stack.Navigator>
    )
}

export default WelcomeStack
