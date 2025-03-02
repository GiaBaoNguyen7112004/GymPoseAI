import Notification from '../screens/Home/Notification'
import AuthStack from './AuthStack'
import MainTabs from './MainTabs'
import { createStackNavigator } from '@react-navigation/stack'

export type rootStackParamList = {
    AuthStack: undefined
    MainTab: undefined
    Notification: undefined
    StoryTaker: undefined
    Direct: undefined
}

const RootTab = createStackNavigator<rootStackParamList>()

const RootTabComponent = (): JSX.Element => {
    const logined = true

    return (
        <RootTab.Navigator
            initialRouteName={logined ? 'MainTab' : 'AuthStack'}
            screenOptions={{ headerShown: false, gestureEnabled: false }}
        >
            <RootTab.Screen name='AuthStack' component={AuthStack} />
            <RootTab.Screen name='MainTab' component={MainTabs} />
            <RootTab.Screen name='Notification' component={Notification} />
        </RootTab.Navigator>
    )
}

export default RootTabComponent
