import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'
import { Profile } from '@/src/screens/Home/Profile'
import { AccountCenter } from '@/src/screens/Home/Profile/Account'
import ActivityHistory from '@/src/screens/Others/ActivityHistory'
import Setting from '@/src/screens/Home/Profile/Setting/Setting'
export type ProfileStackParams = {
    Profile: undefined
    Privacy: undefined
    ActivityHistory: undefined
    Setting: undefined
}

const Stack = createStackNavigator<ProfileStackParams>()

const ProfileStack = () => {
    const stackNavigationOptions: StackNavigationOptions = {
        headerShown: false,
        gestureEnabled: false
    }
    return (
        <Stack.Navigator screenOptions={stackNavigationOptions}>
            <Stack.Screen name='Profile' component={Profile} />
            <Stack.Screen name='Privacy' component={AccountCenter} />
            <Stack.Screen name='ActivityHistory' component={ActivityHistory} />
            <Stack.Screen name='Setting' component={Setting} />
        </Stack.Navigator>
    )
}

export default ProfileStack
