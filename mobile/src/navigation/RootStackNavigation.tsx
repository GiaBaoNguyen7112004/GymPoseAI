import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'
import { RootStackParamList } from './types'

// Auth Screens
import WelcomeScreen from '@/screens/Auth/Welcome'
import Login from '@/screens/Auth/Login'
import ForgotPassword from '@/screens/Auth/ForgotPassword'

// Main Tabs
import MainTabs from './MainTabs'

// App Screens
import WorkoutHistoryCenter from '@/screens/Other/WorkoutHistoryCenter'
import WorkoutSummaryDetail from '@/screens/Other/WorkoutSummaryDetail'
import CategoryDetail from '@/screens/Other/CategoryDetail'
import ActivityTracker from '@/screens/Other/ActivityTracker'

// Common Screens
import ContactUs from '@/screens/Other/ContactUs'
import PrivacyPolicy from '@/screens/Other/PrivacyPolicy/PrivacyPolicy'
import ActivityListScreen from '@/screens/Other/ActivityListScreen'
import CompleteProfile from '@/screens/Other/CompleteProfile'
import ConfirmYourGoal from '@/screens/Other/ConfirmYourGoal'
import Register from '@/screens/Auth/Register'
import ExerciseDetail from '@/screens/Other/ExerciseDetail'
import GymLiveScreen from '@/screens/Other/GymLiveScreen'
import useAppContext from '@/hooks/useAppContext'
import BlueToothScan from '@/screens/Other/BlueToothScan'
import MyDevice from '@/screens/Other/MyDevice'
import AboutGymBotScreen from '@/screens/Other/AboutGymBot'
import Congratulation from '@/screens/Other/Congratulation'

const RootStack = createStackNavigator<RootStackParamList>()

function RootStackNavigation() {
    const { isAuthenticated } = useAppContext()

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
                    <RootStack.Screen name='BlueToothScan' component={BlueToothScan} />
                    <RootStack.Screen name='WorkoutHistoryCenter' component={WorkoutHistoryCenter} />
                    <RootStack.Screen name='WorkoutSummaryDetail' component={WorkoutSummaryDetail} />
                    <RootStack.Screen name='CategoryDetail' component={CategoryDetail} />
                    <RootStack.Screen name='ExerciseDetail' component={ExerciseDetail} />
                    <RootStack.Screen name='ActivityTracker' component={ActivityTracker} />
                    <RootStack.Screen name='CompleteProfile' component={CompleteProfile} />
                    <RootStack.Screen
                        name='ConfirmYourGoal'
                        component={ConfirmYourGoal}
                        options={{ gestureEnabled: false }}
                    />
                    <RootStack.Screen name='ActivityList' component={ActivityListScreen} />
                    <RootStack.Screen name='GymLiveScreen' component={GymLiveScreen} />
                    <RootStack.Screen name='MyDevice' component={MyDevice} />
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
                <RootStack.Screen name='AboutGymBot' component={AboutGymBotScreen} />
                <RootStack.Screen
                    name='Congratulation'
                    component={Congratulation}
                    options={{ gestureEnabled: false }}
                />
            </RootStack.Group>
        </RootStack.Navigator>
    )
}

export default RootStackNavigation
