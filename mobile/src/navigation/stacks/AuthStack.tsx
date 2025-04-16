import { createStackNavigator } from '@react-navigation/stack'
import Login from '@/src/screens/Auth/Login'
import { Register } from '@/src/screens/Auth/Register'
import ForgotPassword from '@/src/screens/Auth/ForgotPassword'
import { RootStackParamList } from '../types'

const Stack = createStackNavigator<RootStackParamList>()

function AuthStack() {
    return (
        <Stack.Group screenOptions={{ gestureEnabled: false }}>
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='CreateAccount' component={Register.CreateAccount} />
            <Stack.Screen name='CompleteProfile' component={Register.CompleteProfile} />
            <Stack.Screen name='ConfirmYourGoal' component={Register.ConfirmYourGoal} />
            <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
        </Stack.Group>
    )
}

export default AuthStack
