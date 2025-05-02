import { StyleSheet, SafeAreaView, View, InteractionManager } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import React, { useCallback, useEffect, useState } from 'react'

import WorkoutProgressChart from './components/WorkoutProgress'
import { MainTabScreenProps } from '@/navigation/types'
import BlankScreenLoader from '@/components/BlankScreenLoader'
import WorkoutHistory from './components/WorkoutHistory'
import Header from './components/Header'
import BMISection from './components/BMISection'
import TodayTargetSection from './components/TodayTargetSection'
import useInteractionReadyState from '@/hooks/useInteractionReadyState'
import ActivityStatusSection from './components/ActivityStatusSection/ActivityStatusSection'

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
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container} removeClippedSubviews={true}>
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
