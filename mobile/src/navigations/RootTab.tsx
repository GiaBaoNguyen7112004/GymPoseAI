import { createMaterialTopTabNavigator, MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs'
import AuthStack from './AuthStack'
import MainTabs from './MainTabs'

export type rootStackParamList = {
    AuthStack: undefined
    MainTab: undefined
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
        <RootTab.Navigator initialRouteName={logined ? 'MainTab' : 'AuthStack'} screenOptions={navigationOptions}>
            {!logined && <RootTab.Screen name='AuthStack' component={AuthStack} />}
            {logined && <RootTab.Screen name='MainTab' component={MainTabs} />}
        </RootTab.Navigator>
    )
}

export default RootTabComponent
