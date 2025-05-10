import { StyleSheet, SafeAreaView, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import React, { useCallback } from 'react'

import WorkoutProgressChart from './components/WorkoutProgress'
import { MainTabScreenProps } from '@/navigation/types'
import WorkoutHistory from './components/WorkoutHistory'
import Header from './components/Header'
import BMISection from './components/BMISection'
import DailyTargetSection from './components/DailyTargetSection'
import ActivityStatusSection from './components/ActivityStatusSection/ActivityStatusSection'
import useInteractionReadyState from '@/hooks/useInteractionReadyState'
import HomeSkeleton from './components/HomeSkeleton'

function Home({ navigation, route }: MainTabScreenProps<'Home'>) {
    const { isReady } = useInteractionReadyState()
    const handleNotificationClick = useCallback(() => {
        navigation.navigate('Notification')
    }, [navigation])

    const handleCheckDailyTarget = useCallback(() => {
        navigation.navigate('ActivityTracker')
    }, [navigation])

    if (!isReady) {
        return <HomeSkeleton />
    }
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container} removeClippedSubviews={true}>
                <View style={styles.content}>
                    <Header handleNotificationClick={handleNotificationClick} />
                    <BMISection />
                    <DailyTargetSection handleCheckDailyTarget={handleCheckDailyTarget} />
                    <ActivityStatusSection />
                    <WorkoutProgressChart />
                    <WorkoutHistory navigation={navigation} route={route} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    container: {
        backgroundColor: '#FFF',
        alignSelf: 'center'
    },
    content: {
        width: '100%',
        alignItems: 'center'
    }
})

export default Home
