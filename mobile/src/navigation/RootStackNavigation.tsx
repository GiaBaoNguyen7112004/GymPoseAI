import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'
import Login from '../screens/Auth/Login'
import RegisterStep1 from '../screens/Auth/Register/RegisterStep1'
import RegisterStep2 from '../screens/Auth/Register/RegisterStep2'
import RegisterStep3 from '../screens/Auth/Register/RegisterStep3'
import ForgotPassword from '../screens/Auth/ForgotPassword/ForgotPassword'
import WelcomeScreen from '../screens/Auth/Welcome/welcome'
import MainTabs from './MainTabs'
import Notification from '../screens/Home/Notification'
import ContactUs from '../screens/Home/Profile/ContactUs'
import PrivacyPolicy from '../screens/Home/Profile/PrivacyPolicy'
import { useContext } from 'react'
import { AppContext } from '../Contexts/App.context'

export type SuperRootStackParamList = {
    Login: undefined
    RegisterStep1: undefined
    RegisterStep2: undefined
    RegisterStep3: undefined
    ForgotPassword: undefined
    Welcome: undefined
    MainTab: undefined
    Notification: undefined
    ContactUs: undefined
    PrivacyPolicy: undefined
}

const RootStack = createStackNavigator<SuperRootStackParamList>()

function RootStackNavigation() {
    const { isAuthenticated } = useContext(AppContext)
    const navigationOptions: StackNavigationOptions = {
        headerShown: false,
        gestureEnabled: false
    }
    return (
        <RootStack.Navigator screenOptions={navigationOptions} initialRouteName={isAuthenticated ? 'MainTab' : 'Login'}>
            {!isAuthenticated ? (
                <>
                    <RootStack.Screen name='Login' component={Login} />
                    <RootStack.Group screenOptions={{ headerShown: false }}>
                        <RootStack.Screen name='RegisterStep1' component={RegisterStep1} />
                        <RootStack.Screen name='RegisterStep2' component={RegisterStep2} />
                        <RootStack.Screen name='RegisterStep3' component={RegisterStep3} />
                    </RootStack.Group>
                    <RootStack.Screen name='ForgotPassword' component={ForgotPassword} />
                </>
            ) : (
                <>
                    <RootStack.Screen name='MainTab' component={MainTabs} />
                    <RootStack.Screen name='Notification' component={Notification} />
                    <RootStack.Screen name='Welcome' component={WelcomeScreen} />
                </>
            )}
            <RootStack.Group navigationKey={isAuthenticated ? 'user' : 'guest'}>
                <RootStack.Screen name='ContactUs' component={ContactUs} />
                <RootStack.Screen name='PrivacyPolicy' component={PrivacyPolicy} />
            </RootStack.Group>
        </RootStack.Navigator>
    )
}

export default RootStackNavigation
