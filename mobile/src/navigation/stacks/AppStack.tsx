import { createStackNavigator } from '@react-navigation/stack'
import WelcomeScreen from '@/src/screens/Auth/Welcome'
import Notification from '@/src/screens/Other/Notification'
import WorkoutHistoryCenter from '@/src/screens/Other/WorkoutHistoryCenter'
import WorkoutHistoryDetail from '@/src/screens/Other/WorkoutHistoryDetail'
import CategoryDetail from '@/src/screens/Other/CategoryDetail'
import WorkoutDetail from '@/src/screens/Other/WorkoutDetail'
import ActivityTracker from '@/src/screens/Other/ActivityTracker'
import Setting from '@/src/screens/Other/Setting'
import { RootStackParamList } from '../types'
import MainTabs from '../tabs/MainTabs'

const Stack = createStackNavigator<RootStackParamList>()
function AppStack() {
    return (
        <Stack.Group screenOptions={{ gestureEnabled: true }}>
            <Stack.Screen name='Welcome' component={WelcomeScreen} options={{ gestureEnabled: false }} />
            <Stack.Screen name='MainTab' component={MainTabs} />
            <Stack.Screen name='Notification' component={Notification} />
            <Stack.Screen name='WorkoutHistoryCenter' component={WorkoutHistoryCenter} />
            <Stack.Screen name='WorkoutHistoryDetail' component={WorkoutHistoryDetail} />
            <Stack.Screen name='CategoryDetail' component={CategoryDetail} />
            <Stack.Screen name='WorkoutDetail' component={WorkoutDetail} />
            <Stack.Screen name='ActivityTracker' component={ActivityTracker} />
            <Stack.Screen name='Setting' component={Setting} />
        </Stack.Group>
    )
}

export default AppStack
