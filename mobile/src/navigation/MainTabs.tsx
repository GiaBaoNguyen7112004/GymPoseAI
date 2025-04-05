import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StyleSheet, View } from 'react-native'
import TabBarComponent from '@/src/components/BottomTabBar/BottomTabBar'
import { WorkoutTracker } from '@/src/screens/Home/WorkoutTracker'
import StoryTaker from '@/src/screens/Home/StoryTaker'
import Search from '@/src/screens/Home/Search'
import MyIcon from '@/src/components/Icon'
import { IconName } from '@/src/components/Icon/Icon'
import GradientButton from '@/src/components/GradientButton'
import Home from '@/src/screens/Home/Home'
import ProfileStack from './ProfileStack'

export type MainTabParamList = {
    Home: undefined
    WorkoutTracker: undefined
    Search: undefined
    StoryTaker: undefined
    Profile: undefined
}
const Tab = createBottomTabNavigator<MainTabParamList>()

const MainTabs = () => {
    const mainTabsOptions: BottomTabNavigationOptions = {
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: 'white', paddingTop: 18 }
    }

    return (
        <Tab.Navigator tabBar={TabBarComponent} screenOptions={mainTabsOptions} initialRouteName='Home'>
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => getTabBarIcon('homeIcon', 'homeIconFilled', focused)
                }}
                component={Home}
                name='Home'
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
                    tabBarIcon: () => (
                        <GradientButton rounded style={styles.wrapperSearchIcon}>
                            <MyIcon name={'searchIcon'} size={23} />
                        </GradientButton>
                    )
                }}
                component={Search}
                name='Search'
            />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => getTabBarIcon('cameraIcon', 'cameraIconFilled', focused),
                    tabBarStyle: { display: 'none' }
                }}
                component={StoryTaker}
                name='StoryTaker'
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
