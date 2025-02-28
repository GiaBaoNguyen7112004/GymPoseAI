import AuthStack from './AuthStack'
import MainTabs from './MainTabs'
import { createStackNavigator } from '@react-navigation/stack'

export type rootStackParamList = {
    AuthStack: undefined
    MainTab: undefined
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
        </RootTab.Navigator>
    )
}

export default RootTabComponent
