import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'
import RootTab from './RootTab'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from '../services/NavigationService'
export type SuperRootStackParamList = {
    RootTab: undefined
    Logout: undefined
}
const RootStack = createStackNavigator<SuperRootStackParamList>()
const RootStackNavigation = (): JSX.Element => {
    const navigationOptions: StackNavigationOptions = {
        headerShown: false,
        gestureEnabled: false,
        cardStyle: {}
    }
    return (
        <NavigationContainer ref={navigationRef}>
            <RootStack.Navigator initialRouteName='RootTab' screenOptions={navigationOptions}>
                <RootStack.Screen name='RootTab' component={RootTab} />
            </RootStack.Navigator>
        </NavigationContainer>
    )
}
export default RootStackNavigation
