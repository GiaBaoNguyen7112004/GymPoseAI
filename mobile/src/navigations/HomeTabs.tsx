import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ParamListBase } from '@react-navigation/native'
import { Home } from '../screens/Home'
import Notification from '../screens/Home/Notification'

interface HomeTabParamList extends ParamListBase {
    Home: undefined
    Notification: undefined
}

const Tab = createMaterialTopTabNavigator<HomeTabParamList>()

function HomeTab() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Tab.Navigator
                initialRouteName='Home'
                screenOptions={{
                    tabBarStyle: { backgroundColor: 'white' },
                    tabBarIndicatorStyle: { backgroundColor: 'blue' }
                }}
            >
                <Tab.Screen name='Home' component={Notification} />
                <Tab.Screen name='Notification' component={Home} />
            </Tab.Navigator>
        </SafeAreaView>
    )
}

export default HomeTab
