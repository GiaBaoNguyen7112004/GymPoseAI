import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'
import { ProfileStackParamList } from './types'
import Profile from '../screens/Main/Profile'
import AccountCenter from '../screens/Other/AccountCenter'
import ActivityHistory from '../screens/Other/ActivityHistory'
import Setting from '../screens/Other/Setting/Setting'

const Stack = createStackNavigator<ProfileStackParamList>()

const ProfileStack = () => {
    const stackNavigationOptions: StackNavigationOptions = {
        headerShown: false,
        gestureEnabled: false
    }

    return (
        <Stack.Navigator screenOptions={stackNavigationOptions}>
            <Stack.Screen name='ManageProfile' component={Profile} />
            <Stack.Screen name='Privacy' component={AccountCenter} />
            <Stack.Screen name='ActivityHistory' component={ActivityHistory} />
            <Stack.Screen name='Setting' component={Setting} />
        </Stack.Navigator>
    )
}

export default ProfileStack
