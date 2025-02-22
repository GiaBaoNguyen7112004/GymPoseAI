import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'
import RootTab from './RootTab'
export type SuperRootStackParamList = {
    RootTab: undefined
    Logout: undefined
}
const RootStack = createStackNavigator<SuperRootStackParamList>()
const index = (): JSX.Element => {
    const navigationOptions: StackNavigationOptions = {
        headerShown: false,
        gestureEnabled: false,
        cardStyle: {}
    }
    return (
        <RootStack.Navigator initialRouteName='RootTab' screenOptions={navigationOptions}>
            <RootStack.Screen name='RootTab' component={RootTab} />
        </RootStack.Navigator>
    )
}
export default index
