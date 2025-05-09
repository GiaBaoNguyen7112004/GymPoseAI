import React, { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { workoutHistoryApi } from '@/services/rest'
import { MainTabScreenProps } from '@/navigation/types'
import { SCREEN_WIDTH } from '@/constants/devices.constant'
import WorkoutHistoryHeader from './WorkoutHistoryHeader'
import WorkoutHistoryList from './WorkoutHistoryList'

export default function WorkoutHistory({ navigation }: MainTabScreenProps<'Home'>) {
    const { data: workoutHistoryResp, isLoading } = useQuery({
        queryKey: ['workout-history'],
        queryFn: () =>
            workoutHistoryApi.getWorkoutSummaryList({
                params: { page: 1, limit: 3, sort_by: 'createAt', viewMode: 'daily' }
            }),
        staleTime: 1000 * 60 * 5
    })

    const data = workoutHistoryResp?.data.data

    const handleSeeMore = useCallback(() => {
        navigation.navigate('WorkoutHistoryCenter')
    }, [navigation])

    const handlePressItem = useCallback(
        (id: string) => {
            navigation.navigate('WorkoutHistoryDetail', { workout_id: id })
        },
        [navigation]
    )

    return (
        <View style={styles.wrapper}>
            <WorkoutHistoryHeader onPressSeeMore={handleSeeMore} />
            <View style={styles.list}>
                <WorkoutHistoryList data={data} isLoading={isLoading} onPressItem={handlePressItem} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        width: '100%'
    },
    list: {
        marginTop: 20,
        width: SCREEN_WIDTH,
        paddingBottom: 20
    }
})
