import { View, StyleSheet, ScrollView } from 'react-native'
import NavigationBar from '@/components/NavigationBar'
import { SafeAreaView } from 'react-native-safe-area-context'
import DailyTarget from './Components/DailyTarget'
import ActivityProgress from './Components/ActivityProgress'
import LatestActivity from './Components/LatestActivity'
import { RootStackScreenProps } from '@/navigation/types'
import { useCallback, useState } from 'react'
import FormUpdateDailyTarget from './Components/FormUpdateDailyTarget'
import { targetApi } from '@/services/rest'
import { useQuery } from '@tanstack/react-query'
import useScrollListener from '@/hooks/useScrollListener'
import useInteractionReadyState from '@/hooks/useInteractionReadyState'
import BlankScreenLoader from '@/components/BlankScreenLoader'

function ActivityTracker({ navigation }: RootStackScreenProps<'ActivityTracker'>) {
    const { isReady } = useInteractionReadyState()
    const [modalUpdateTargetVisible, setModalUpdateTargetVisible] = useState<boolean>(false)
    const { isScrolled, handleScroll } = useScrollListener()
    const toggleModalUpdateTarget = useCallback(() => {
        setModalUpdateTargetVisible((prev) => !prev)
        refetch()
    }, [])

    const { data, refetch } = useQuery({ queryKey: ['today-target'], queryFn: targetApi.getDailyTarget })
    const { water_target = 0, calories_target = 0 } = data?.data?.data ?? {}

    if (!isReady) {
        return <BlankScreenLoader />
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={[styles.header, isScrolled && styles.headerWithBorder]}>
                <NavigationBar title='Activity Tracker' callback={navigation.goBack} />
            </SafeAreaView>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                <View style={styles.todayTargetCard}>
                    <DailyTarget
                        caloriesVal={calories_target}
                        waterVal={water_target}
                        updateDailyTargetPress={toggleModalUpdateTarget}
                    />
                </View>

                <View style={styles.activityProgressCard}>
                    <ActivityProgress />
                </View>

                <View style={styles.latestActivityCard}>
                    <LatestActivity />
                </View>
                <FormUpdateDailyTarget
                    visible={modalUpdateTargetVisible}
                    onCancel={toggleModalUpdateTarget}
                    onUpdate={toggleModalUpdateTarget}
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    header: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'transparent'
    },
    headerWithBorder: {
        borderBottomColor: '#E5E5E5'
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 30,
        flexGrow: 1
    },
    todayTargetCard: {
        marginVertical: 30
    },
    activityProgressCard: {
        marginBottom: 30
    },
    latestActivityCard: {
        flex: 1
    }
})

export default ActivityTracker
