import { createMaterialTopTabNavigator, MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs'
import AuthStack from './AuthStack'
import HomeTab from './HomeTab'

export type rootStackParamList = {
    AuthStack: undefined
    HomeTab: undefined
    StoryTaker: undefined
    Direct: undefined
}

const RootTab = createMaterialTopTabNavigator<rootStackParamList>()

const RootTabComponent = (): JSX.Element => {
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

export default RootTabComponent
