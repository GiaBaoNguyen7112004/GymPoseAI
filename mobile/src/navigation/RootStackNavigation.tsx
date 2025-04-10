import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'
import { useContext } from 'react'
import { AppContext } from '../Contexts/App.context'
import { RootStackParamList } from './types'
import MainTabs from './MainTabs'
import Login from '../screens/Auth/Login'
import { Register } from '../screens/Auth/Register'
import ForgotPassword from '../screens/Auth/ForgotPassword'
import WelcomeScreen from '../screens/Auth/Welcome'
import Notification from '../screens/Other/Notification'
import ContactUs from '../screens/Other/ContactUs'
import PrivacyPolicy from '../screens/Other/PrivacyPolicy/PrivacyPolicy'
import WorkoutHistoryCenter from '../screens/Other/WorkoutHistoryCenter/WorkoutHistoryCenter'
import WorkoutHistoryDetail from '../screens/Other/WorkoutHistoryDetail'
import CategoryDetail from '../screens/Other/CategoryDetail'
import WorkoutDetail from '../screens/Other/WorkoutDetail'
import ActivityTracker from '../screens/Other/ActivityTracker'

const RootStack = createStackNavigator<RootStackParamList>()

function RootStackNavigation() {
    const { isAuthenticated } = useContext(AppContext)
    const navigationOptions: StackNavigationOptions = {
        headerShown: false,
        gestureEnabled: true
    }

    return (
        <RootStack.Navigator screenOptions={navigationOptions} initialRouteName={isAuthenticated ? 'Welcome' : 'Login'}>
            {!isAuthenticated ? (
                <>
                    <RootStack.Group screenOptions={{ gestureEnabled: false }}>
                        <RootStack.Screen name='Login' component={Login} />
                        <RootStack.Screen name='CreateAccount' component={Register.CreateAccount} />
                        <RootStack.Screen name='CompleteProfile' component={Register.CompleteProfile} />
                        <RootStack.Screen name='ConfirmYourGoal' component={Register.ConfirmYourGoal} />
                        <RootStack.Screen name='ForgotPassword' component={ForgotPassword} />
                    </RootStack.Group>
                </>
            ) : (
                <>
                    <RootStack.Group screenOptions={{ gestureEnabled: true }}>
                        <RootStack.Screen
                            name='Welcome'
                            component={WelcomeScreen}
                            options={{
                                gestureEnabled: false
                            }}
                        />
                        <RootStack.Screen name='MainTab' component={MainTabs} />
                        <RootStack.Screen name='Notification' component={Notification} />
                        <RootStack.Screen name='WorkoutHistoryCenter' component={WorkoutHistoryCenter} />
                        <RootStack.Screen name='WorkoutHistoryDetail' component={WorkoutHistoryDetail} />
                        <RootStack.Screen name='CategoryDetail' component={CategoryDetail} />
                        <RootStack.Screen name='WorkoutDetail' component={WorkoutDetail} />
                        <RootStack.Screen name='ActivityTracker' component={ActivityTracker} />
                    </RootStack.Group>
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
