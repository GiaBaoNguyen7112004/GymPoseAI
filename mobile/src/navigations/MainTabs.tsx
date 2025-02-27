import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StyleSheet, View } from 'react-native'
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
import { Icon as MyIcon } from '../components/Icon'
import { IconName } from '../components/Icon/Icon'
import { GradientButton } from '../components/GradientButton'
import { navigation } from '../services/NavigationService'
import HomeTab from './HomeTabs'

export type HomeTabParamList = {
    HomeTab: undefined
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

const getTabBarIcon = (iconName: IconName, iconActive: IconName, focused: any, iconSize = 23) => {
    return focused ? (
        <View style={styles.wrapperActiveIcon}>
            <MyIcon name={iconActive} size={iconSize} />
            <MyIcon name='dotGradient' size={4} style={styles.dotIcon} />
        </View>
    ) : (
        <MyIcon name={iconName} size={iconSize} />
    )
}

const MainTabs = () => {
    return (
        <Tab.Navigator
            tabBar={TabBarComponent}
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: { backgroundColor: 'white', paddingTop: 18 }
            }}
        >
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => getTabBarIcon('homeIcon', 'homeIconFilled', focused)
                }}
                component={HomeTab}
                name='HomeTab'
            />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => getTabBarIcon('activity', 'activityFilled', focused)
                }}
                component={WorkoutTracker}
                name='WorkoutTracker'
            />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => (
                        <GradientButton
                            onPress={() => navigation.navigate('Search')}
                            rounded
                            style={styles.wrapperSearchIcon}
                        >
                            <MyIcon name={'searchIcon'} size={23} />
                        </GradientButton>
                    )
                }}
                component={Search}
                name='Search'
            />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => getTabBarIcon('cameraIcon', 'cameraIconFilled', focused)
                }}
                component={TakePhoto}
                name='TakePhoto'
            />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => getTabBarIcon('profileLight', 'profileLightFilled', focused)
                }}
                component={ProfileStack}
                name='Profile'
            />
        </Tab.Navigator>
    )
}

export default MainTabs

const styles = StyleSheet.create({
    wrapperActiveIcon: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dotIcon: {
        position: 'absolute',
        bottom: -8
    },
    wrapperSearchIcon: {
        shadowColor: 'rgba(149, 173, 254, 0.30)',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 22,
        elevation: 10,
        marginBottom: 23 + 10,
        width: 60,
        height: 60
    }
})
