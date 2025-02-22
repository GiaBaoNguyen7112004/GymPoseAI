import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TabBarComponent } from '../components/BottomTabBar/BottomTabBar'
import { createStackNavigator } from '@react-navigation/stack'
import { Profile } from '../screens/Home/Profile'
import { AccountCenter } from '../screens/Home/Profile/Account'
import PrivacyPolicy from '../screens/Home/Profile/PrivacyPolicy'
import ContactUs from '../screens/Home/Profile/ContactUs'
import Setting from '../screens/Home/Profile/Setting/Setting'
import ActivityHistory from '../screens/Others/ActivityHistory'
import { Home } from '../screens/Home'
import { WorkoutTracker } from '../screens/Home/WorkoutTracker'
import TakePhoto from '../screens/Home/TakePhoto'
import Search from '../screens/Home/Search'

export type HomeTabParamList = {
    Home: undefined
    WorkoutTracker: undefined
    Search: undefined
    TakePhoto: undefined
    Profile: undefined
}

const Stack = createStackNavigator()
const ProfileStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: false
            }}
        >
            <Stack.Screen component={Profile} name='Account' />
            <Stack.Screen name='account' component={AccountCenter} />
            <Stack.Screen name='ProfileXFollow' component={ActivityHistory} />
            <Stack.Screen component={Setting} name='Setting' />
            <Stack.Screen name='CreateHighlight' component={ContactUs} />
            <Stack.Screen name='PrivacyPolicy' component={PrivacyPolicy} />
        </Stack.Navigator>
    )
}

const Tab = createBottomTabNavigator<HomeTabParamList>()
const HomeTab = () => {
    return (
        <Tab.Navigator
            tabBar={TabBarComponent}
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: { backgroundColor: 'white' }
            }}
        >
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => <Icon name='home' size={30} color={focused ? '#000' : '#ddd'} />
                }}
                component={Home}
                name='Home'
            />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => <Icon name='magnify' size={30} color={focused ? '#000' : '#ddd'} />
                }}
                component={WorkoutTracker}
                name='WorkoutTracker'
            />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => <Icon name='plus-box' size={30} color={'#ddd'} />
                }}
                component={Search}
                name='Search'
            />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => <Icon name='magnify' size={30} color={focused ? '#000' : '#ddd'} />
                }}
                component={TakePhoto}
                name='TakePhoto'
            />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => <Icon name='account' size={30} color={focused ? '#000' : '#ddd'} />
                }}
                component={ProfileStack}
                name='Profile'
            />
        </Tab.Navigator>
    )
}

export default HomeTab

const styles = StyleSheet.create({})
