import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import TabBarComponent from '@/components/BottomTabBar'
import MyIcon from '@/components/Icon'
import Home from '@/screens/Main/Home/Home'
import WorkoutTracker from '@/screens/Main/WorkoutTracker'
import Search from '@/screens/Main/Search/Search'
import { MainTabParamList } from './types'
import { IconName } from '@/constants/icon.constants'
import Profile from '@/screens/Main/Profile'
import BlueToothScan from '@/screens/Main/BlueToothScan'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Tab = createBottomTabNavigator<MainTabParamList>()

const MainTabs = () => {
    const { bottom } = useSafeAreaInsets()
    return (
        <Tab.Navigator
            initialRouteName='Home'
            tabBar={(props) => <TabBarComponent {...props} containerStyle={{ height: 80 }} />}
            screenOptions={defaultTabOptions}
        >
            <Tab.Screen
                name='Home'
                component={Home}
                options={{
                    tabBarIcon: renderTabIcon('homeIcon', 'homeIconFilled'),
                    tabBarButton: renderTabButton
                }}
            />
            <Tab.Screen
                name='WorkoutTracker'
                component={WorkoutTracker}
                options={{
                    tabBarIcon: renderTabIcon('activity', 'activityFilled'),
                    tabBarButton: renderTabButton
                }}
            />
            <Tab.Screen
                name='Search'
                component={Search}
                options={{
                    tabBarIcon: () => (
                        <LinearGradient
                            colors={['#92A3FD', '#9DCEFF']}
                            start={{ x: 1, y: 0.5 }}
                            end={{ x: 0, y: 0.5 }}
                            style={styles.searchButton}
                        >
                            <MyIcon name='searchIcon' size={23} />
                        </LinearGradient>
                    ),
                    tabBarButton: renderTabButton
                }}
            />
            <Tab.Screen
                name='BlueToothScan'
                component={BlueToothScan}
                options={{
                    tabBarIcon: renderTabIcon('cameraIcon', 'cameraIconFilled'),
                    tabBarButton: renderTabButton
                }}
            />
            <Tab.Screen
                name='Profile'
                component={Profile}
                options={{
                    tabBarIcon: renderTabIcon('profileLight', 'profileLightFilled'),
                    tabBarButton: renderTabButton
                }}
            />
        </Tab.Navigator>
    )
}

export default MainTabs

const defaultTabOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle: {
        backgroundColor: 'white',
        paddingTop: 18
    }
}

const renderTabIcon = (iconName: IconName, iconActive: IconName, iconSize = 23) => {
    return ({ focused }: { focused: boolean }) => {
        return (
            <View style={styles.activeIconContainer}>
                <MyIcon name={focused ? iconActive : iconName} size={iconSize} />
                {focused && <MyIcon name='dotGradient' size={4} style={styles.dotIndicator} />}
            </View>
        )
    }
}

const renderTabButton = ({ onPress, ...rest }: any) => (
    <TouchableWithoutFeedback onPress={onPress}>
        <View {...rest} />
    </TouchableWithoutFeedback>
)

const styles = StyleSheet.create({
    activeIconContainer: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dotIndicator: {
        position: 'absolute',
        bottom: -8
    },
    searchButton: {
        width: 60,
        height: 60,
        borderRadius: 999,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 33,
        shadowColor: 'rgba(149, 173, 254, 0.30)',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        elevation: 10
    }
})
