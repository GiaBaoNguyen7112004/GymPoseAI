import React, { useCallback } from 'react'
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '@/screens/Main/Home/Home'
import WorkoutTracker from '@/screens/Main/WorkoutTracker'
import Search from '@/screens/Main/Search/Search'
import { MainTabParamList } from './types'
import Profile from '@/screens/Main/Profile'
import Notification from '@/screens/Main/Notification'
import NotificationBadgeIcon from '@/components/NotificationBadgeIcon'
import useNewNotificationCount from '@/hooks/useNewNotificationCount'
import TabBarButton from './components/TabBarButton'
import { IconName } from '@/constants/icon.constants'
import TabBarSearchIcon from './components/TabBarSearchIcon'
import TabBarIcon from './components/TabBarIcon'

const Tab = createBottomTabNavigator<MainTabParamList>()

const defaultTabOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle: {
        backgroundColor: 'white',
        height: 60
    },
    lazy: true
}

function MainTabs() {
    const renderTabIcon = useCallback((iconName: IconName, iconActive: IconName) => {
        return ({ focused }: { focused: boolean }) => (
            <TabBarIcon iconName={iconName} iconActive={iconActive} focused={focused} />
        )
    }, [])

    return (
        <Tab.Navigator initialRouteName='Home' screenOptions={defaultTabOptions}>
            <Tab.Screen
                name='Home'
                component={Home}
                options={{
                    tabBarIcon: renderTabIcon('homeIcon', 'homeIconFilled'),
                    tabBarButton: TabBarButton,
                    freezeOnBlur: true
                }}
            />
            <Tab.Screen
                name='WorkoutTracker'
                component={WorkoutTracker}
                options={{
                    tabBarIcon: renderTabIcon('activity', 'activityFilled'),
                    tabBarButton: TabBarButton
                }}
            />
            <Tab.Screen
                name='Search'
                component={Search}
                options={{
                    tabBarIcon: TabBarSearchIcon,
                    tabBarButton: TabBarButton
                }}
            />
            <Tab.Screen
                name='Notification'
                component={Notification}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <NotificationBadgeIcon
                            iconName='notificationIcon'
                            activeIconName='NotificationFilled'
                            size={23}
                            focused={focused}
                            color={color}
                        />
                    ),
                    tabBarButton: TabBarButton
                }}
            />
            <Tab.Screen
                name='Profile'
                component={Profile}
                options={{
                    tabBarIcon: renderTabIcon('profileLight', 'profileLightFilled'),
                    tabBarButton: TabBarButton
                }}
            />
        </Tab.Navigator>
    )
}

export default MainTabs
