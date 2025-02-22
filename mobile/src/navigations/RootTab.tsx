import { createMaterialTopTabNavigator, MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs'
import AuthStack, { AuthStackParamList } from './AuthStack'
import HomeTab, { HomeTabParamList } from './HomeTab'

export type rootStackParamList = {
    AuthStack: undefined
    HomeTab: undefined
    StoryTaker: undefined
    Direct: undefined
}

export type commonParamList = AuthStackParamList & HomeTabParamList & rootStackParamList

const RootTab = createMaterialTopTabNavigator<rootStackParamList>()

const index = (): JSX.Element => {
    const navigationOptions: MaterialTopTabNavigationOptions = {
        tabBarStyle: { display: 'none' }
    }

    const logined = false

    return (
        <RootTab.Navigator initialRouteName={logined ? 'HomeTab' : 'AuthStack'} screenOptions={navigationOptions}>
            {!logined && <RootTab.Screen name='AuthStack' component={AuthStack} />}
            {logined && <RootTab.Screen name='HomeTab' component={HomeTab} />}
        </RootTab.Navigator>
    )
}

export default index
