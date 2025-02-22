import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'
import WelcomeStack from './WelcomeStack'
import ForgotPassword from '@/src/screens/Auth/ForgotPassword'
import Register from '@/src/screens/Auth/Register'
import Login from '@/src/screens/Auth/Login'
export type AuthStackParamList = {
    Login: undefined
    Register: undefined
    ForgotPassword: undefined
    WelcomeStack: undefined
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
            <Stack.Screen component={Register} name='Register' />
            <Stack.Screen component={ForgotPassword} name='ForgotPassword' />
            <Stack.Screen component={WelcomeStack} name='WelcomeStack' />
        </Stack.Navigator>
    )
}

export default AuthStack
