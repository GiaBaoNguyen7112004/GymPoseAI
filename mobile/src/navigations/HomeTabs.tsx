import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { SafeAreaView } from 'react-native-safe-area-context'
import Home from '../screens/Home/Home'
import Notification from '../screens/Home/Notification'

export type HomeTabParamList = {
    Home: undefined
    Notification: undefined
}
const TopBar = createMaterialTopTabNavigator<HomeTabParamList>()

function HomeTab() {
    return (
        <TopBar.Navigator
            initialRouteName='Home'
            screenOptions={{
                tabBarStyle: { display: 'none' }
            }}
        >
            <TopBar.Screen name='Home' component={Home} />
            <TopBar.Screen name='Notification' component={Notification} />
        </TopBar.Navigator>
    )
}

export default HomeTab
