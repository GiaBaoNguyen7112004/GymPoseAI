import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'
import { useContext } from 'react'
import { AppContext } from '@/src/Contexts/App.context'
import { RootStackParamList } from './types'
import AppStack from './stacks/AppStack'
import AuthStack from './stacks/AuthStack'
import CommonScreens from './stacks/CommonScreens'

const RootStack = createStackNavigator<RootStackParamList>()

function RootStackNavigation() {
    const { isAuthenticated } = useContext(AppContext)

    const navigationOptions: StackNavigationOptions = {
        headerShown: false,
        gestureEnabled: true
    }

    return (
        <RootStack.Navigator screenOptions={navigationOptions} initialRouteName={isAuthenticated ? 'Welcome' : 'Login'}>
            {isAuthenticated ? <AppStack /> : <AuthStack />}
            <CommonScreens isAuthenticated={isAuthenticated} />
        </RootStack.Navigator>
    )
}

export default RootStackNavigation
