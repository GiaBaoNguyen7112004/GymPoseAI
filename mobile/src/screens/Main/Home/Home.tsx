import { StyleSheet, InteractionManager, SafeAreaView, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import React, { useCallback, useEffect, useState } from 'react'

import WorkoutProgressChart from './components/WorkoutProgress'
import { MainTabScreenProps } from '@/navigation/types'
import BlankScreenLoader from '@/components/BlankScreenLoader'
import WorkoutHistory from './components/WorkoutHistory'
import Header from './components/Header/Header'
import BMISection from './components/BMISection'
import TodayTargetSection from './components/TodayTargetSection'
import ActivityStatusSection from './components/ActivityStatusSection/ActivityStatusSection'
import useInteractionReadyState from '@/hooks/useInteractionReadyState'

function Home({ navigation, route }: MainTabScreenProps<'Home'>) {
    const { isReady } = useInteractionReadyState()

    const handleNotificationClick = useCallback(() => {
        navigation.navigate('Notification')
    }, [navigation])

    const handleCheckTodayTarget = useCallback(() => {
        navigation.navigate('ActivityTracker')
    }, [navigation])

    if (!isReady) {
        return <BlankScreenLoader />
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                <View style={styles.content}>
                    <Header handleNotificationClick={handleNotificationClick} />
                    <BMISection />
                    <TodayTargetSection handleCheckTodayTarget={handleCheckTodayTarget} />
                    <ActivityStatusSection />
                    <WorkoutProgressChart />
                    <WorkoutHistory navigation={navigation} route={route} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home

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
