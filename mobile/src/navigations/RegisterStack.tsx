import { createStackNavigator } from '@react-navigation/stack'
import RegisterStep1 from '../screens/Auth/Register/RegisterStep1'
import RegisterStep3 from '../screens/Auth/Register/RegisterStep3'
import RegisterStep2 from '../screens/Auth/Register/RegisterStep2'

export type RegisterStackParamList = {
    RegisterStep1: undefined
    RegisterStep2: undefined
    RegisterStep3: undefined
}

const Stack = createStackNavigator<RegisterStackParamList>()

const RegisterStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='RegisterStep1' component={RegisterStep1} />
            <Stack.Screen name='RegisterStep2' component={RegisterStep2} />
            <Stack.Screen name='RegisterStep3' component={RegisterStep3} />
        </Stack.Navigator>
    )
}

export default RegisterStack
