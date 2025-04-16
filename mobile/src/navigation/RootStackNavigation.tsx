import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'
import { useContext } from 'react'
import { AppContext } from '@/src/Contexts/App.context'
import { RootStackParamList } from './types'

// Auth screens
import WelcomeScreen from '@/src/screens/Auth/Welcome'
import Login from '@/src/screens/Auth/Login'
import { Register } from '@/src/screens/Auth/Register'
import ForgotPassword from '@/src/screens/Auth/ForgotPassword'

// Main tabs
import MainTabs from './MainTabs'

// App screens
import Notification from '@/src/screens/Other/Notification'
import WorkoutHistoryCenter from '@/src/screens/Other/WorkoutHistoryCenter'
import WorkoutHistoryDetail from '@/src/screens/Other/WorkoutHistoryDetail'
import CategoryDetail from '@/src/screens/Other/CategoryDetail'
import WorkoutDetail from '@/src/screens/Other/WorkoutDetail'
import ActivityTracker from '@/src/screens/Other/ActivityTracker'
import Setting from '@/src/screens/Other/Setting'

// Common screens
import ContactUs from '../screens/Other/ContactUs'
import PrivacyPolicy from '../screens/Other/PrivacyPolicy/PrivacyPolicy'

const RootStack = createStackNavigator<RootStackParamList>()

function RootStackNavigation() {
    const { isAuthenticated } = useContext(AppContext)

    const navigationOptions: StackNavigationOptions = {
        headerShown: false,
        gestureEnabled: true
    }

    return (
        <RootStack.Navigator screenOptions={navigationOptions} initialRouteName={isAuthenticated ? 'Welcome' : 'Login'}>
            {isAuthenticated ? (
                <RootStack.Group>
                    <RootStack.Screen name='Welcome' component={WelcomeScreen} options={{ gestureEnabled: false }} />
                    <RootStack.Screen name='MainTab' component={MainTabs} />
                    <RootStack.Screen name='Notification' component={Notification} />
                    <RootStack.Screen name='WorkoutHistoryCenter' component={WorkoutHistoryCenter} />
                    <RootStack.Screen name='WorkoutHistoryDetail' component={WorkoutHistoryDetail} />
                    <RootStack.Screen name='CategoryDetail' component={CategoryDetail} />
                    <RootStack.Screen name='WorkoutDetail' component={WorkoutDetail} />
                    <RootStack.Screen name='ActivityTracker' component={ActivityTracker} />
                    <RootStack.Screen name='Setting' component={Setting} />
                </RootStack.Group>
            ) : (
                <RootStack.Group>
                    <RootStack.Screen name='Login' component={Login} />
                    <RootStack.Screen name='CreateAccount' component={Register.CreateAccount} />
                    <RootStack.Screen name='CompleteProfile' component={Register.CompleteProfile} />
                    <RootStack.Screen name='ConfirmYourGoal' component={Register.ConfirmYourGoal} />
                    <RootStack.Screen name='ForgotPassword' component={ForgotPassword} />
                </RootStack.Group>
            )}
            <RootStack.Group navigationKey={isAuthenticated ? 'user' : 'guest'}>
                <RootStack.Screen name='ContactUs' component={ContactUs} />
                <RootStack.Screen name='PrivacyPolicy' component={PrivacyPolicy} />
            </RootStack.Group>
        </RootStack.Navigator>
    )
}

export default RootStackNavigation
