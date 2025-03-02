import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'
import WelcomeScreen from '@/src/screens/Auth/Welcome/welcome'
import ForgotPassword from '@/src/screens/Auth/ForgotPassword/ForgotPassword'
import Login from '@/src/screens/Auth/Login'
import RegisterStack from './RegisterStack'
export type AuthStackParamList = {
    Login: undefined
    Register: undefined
    ForgotPassword: undefined
    Welcome: undefined
}
const Stack = createStackNavigator<AuthStackParamList>()
const AuthStack = () => {
    const navigationOptions: StackNavigationOptions = {
        headerShown: false,
        gestureEnabled: false
    }
    return (
        <Stack.Navigator screenOptions={navigationOptions}>
            <Stack.Screen component={Login} name='Login' />
            <Stack.Screen component={RegisterStack} name='Register' />
            <Stack.Screen component={ForgotPassword} name='ForgotPassword' />
            <Stack.Screen component={WelcomeScreen} name='Welcome' />
        </Stack.Navigator>
    )
}

export default AuthStack
