import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'
import { useContext } from 'react'
import { AppContext } from '@/Contexts/App.context'
import { RootStackParamList } from './types'

// Auth Screens
import WelcomeScreen from '@/screens/Auth/Welcome'
import Login from '@/screens/Auth/Login'
import ForgotPassword from '@/screens/Auth/ForgotPassword'

// Main Tabs
import MainTabs from './MainTabs'

// App Screens
import Notification from '@/screens/Other/Notification'
import WorkoutHistoryCenter from '@/screens/Other/WorkoutHistoryCenter'
import WorkoutHistoryDetail from '@/screens/Other/WorkoutHistoryDetail'
import CategoryDetail from '@/screens/Other/CategoryDetail'
import ActivityTracker from '@/screens/Other/ActivityTracker'
import Setting from '@/screens/Other/Setting'

// Common Screens
import ContactUs from '@/screens/Other/ContactUs'
import PrivacyPolicy from '@/screens/Other/PrivacyPolicy/PrivacyPolicy'
import ActivityListScreen from '@/screens/Other/ActivityListScreen'
import CompleteProfile from '@/screens/Other/CompleteProfile'
import ConfirmYourGoal from '@/screens/Other/ConfirmYourGoal'
import Register from '@/screens/Auth/Register'
import ExerciseDetail from '@/screens/Other/WorkoutDetail'
import GymLiveScreen from '@/screens/Other/GymLiveScreen'

const RootStack = createStackNavigator<RootStackParamList>()

function RootStackNavigation() {
    const { isAuthenticated } = useContext(AppContext)

    const screenOptions: StackNavigationOptions = {
        headerShown: false,
        gestureEnabled: true,
        animationTypeForReplace: 'pop',
        animation: 'slide_from_right'
    }
    return (
        <RootStack.Navigator screenOptions={screenOptions} initialRouteName={isAuthenticated ? 'Welcome' : 'Login'}>
            {isAuthenticated ? (
                <RootStack.Group>
                    <RootStack.Screen name='Welcome' component={WelcomeScreen} options={{ gestureEnabled: false }} />
                    <RootStack.Screen name='MainTab' component={MainTabs} options={{}} />
                    <RootStack.Screen name='Notification' component={Notification} />
                    <RootStack.Screen name='WorkoutHistoryCenter' component={WorkoutHistoryCenter} />
                    <RootStack.Screen name='WorkoutHistoryDetail' component={WorkoutHistoryDetail} />
                    <RootStack.Screen name='CategoryDetail' component={CategoryDetail} />
                    <RootStack.Screen name='ExerciseDetail' component={ExerciseDetail} />
                    <RootStack.Screen name='ActivityTracker' component={ActivityTracker} />
                    <RootStack.Screen name='Setting' component={Setting} />
                    <RootStack.Screen name='CompleteProfile' component={CompleteProfile} />
                    <RootStack.Screen
                        name='ConfirmYourGoal'
                        component={ConfirmYourGoal}
                        options={{ gestureEnabled: false }}
                    />
                    <RootStack.Screen name='ActivityList' component={ActivityListScreen} />
                    <RootStack.Screen name='GymLiveScreen' component={GymLiveScreen} />
                </RootStack.Group>
            ) : (
                <RootStack.Group>
                    <RootStack.Screen name='Login' component={Login} />
                    <RootStack.Screen name='Register' component={Register} />
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
