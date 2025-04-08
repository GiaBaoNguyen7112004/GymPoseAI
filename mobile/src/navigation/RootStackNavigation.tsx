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

const RootStack = createStackNavigator<RootStackParamList>()

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
                        <RootStack.Screen name='CreateAccount' component={Register.CreateAccount} />
                        <RootStack.Screen name='CompleteProfile' component={Register.CompleteProfile} />
                        <RootStack.Screen name='ConfirmYourGoal' component={Register.ConfirmYourGoal} />
                    </RootStack.Group>
                    <RootStack.Screen name='ForgotPassword' component={ForgotPassword} />
                </>
            ) : (
                <>
                    <RootStack.Screen name='MainTab' component={MainTabs} />
                    <RootStack.Screen name='Notification' component={Notification} options={{ gestureEnabled: true }} />
                    <RootStack.Screen
                        name='WorkoutHistoryCenter'
                        component={WorkoutHistoryCenter}
                        options={{ gestureEnabled: true }}
                    />
                    <RootStack.Screen
                        name='WorkoutHistoryDetail'
                        component={WorkoutHistoryDetail}
                        options={{ gestureEnabled: true }}
                    />
                    <RootStack.Screen
                        name='CategoryDetail'
                        component={CategoryDetail}
                        options={{ gestureEnabled: true }}
                    />
                    <RootStack.Screen
                        name='WorkoutDetail'
                        component={WorkoutDetail}
                        options={{ gestureEnabled: true }}
                    />
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
