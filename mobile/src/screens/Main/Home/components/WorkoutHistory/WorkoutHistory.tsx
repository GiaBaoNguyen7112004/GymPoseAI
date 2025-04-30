import React, { useCallback, useContext } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import TrainingSessionCard from '@/components/TrainingSessionCard'
import WorkoutCardSkeleton from '@/components/TrainingSessionCardSkeleton'
import { SCREEN_WIDTH } from '@/constants/devices.constant'
import { useQuery } from '@tanstack/react-query'
import { workoutHistoryApi } from '@/services/rest'
import { AppContext } from '@/Contexts/App.context'
import { MainTabScreenProps } from '@/navigation/types'

export default function WorkoutHistory({ navigation }: MainTabScreenProps<'Home'>) {
    const { profile } = useContext(AppContext)

    const { data: workoutHistoryResp, isLoading: isLoadingWorkout } = useQuery({
        queryKey: ['workout-history'],
        queryFn: () =>
            workoutHistoryApi.getWorkoutHistory({
                params: { page: 1, limit: 3, sort_by: 'createAt', viewMode: 'daily' },
                user_id: profile?.id || ''
            }),
        staleTime: 1000 * 60 * 5
    })

    const workoutHistoryData = workoutHistoryResp?.data.data

    const handleSeeMoreWorkoutHistory = useCallback(() => {
        navigation.navigate('WorkoutHistoryCenter')
    }, [navigation])

    const handleWorkoutCardClick = useCallback(
        (workoutId: string) => {
            navigation.navigate('WorkoutHistoryDetail', { workout_id: workoutId })
        },
        [navigation]
    )

    const renderWorkoutHistory = () => {
        if (isLoadingWorkout) {
            return (
                <View style={styles.workoutsSkeleton}>
                    <WorkoutCardSkeleton />
                    <WorkoutCardSkeleton />
                    <WorkoutCardSkeleton />
                </View>
            )
        }

        return (
            <FlatList
                data={workoutHistoryData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TrainingSessionCard
                        item={item}
                        style={styles.workoutItem}
                        onPress={() => handleWorkoutCardClick(item.id)}
                    />
                )}
                ListEmptyComponent={<Text style={styles.noWorkoutText}>You haven't completed any workouts today.</Text>}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
                scrollEnabled={false}
            />
        )
    }

    return (
        <View style={styles.workoutHistoryWrapper}>
            <View style={styles.workoutProgressHeader}>
                <Text style={styles.title}>Latest Workout</Text>
                <TouchableOpacity onPress={handleSeeMoreWorkoutHistory}>
                    <Text style={styles.subtitle_gray}>See more</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.workoutList}>{renderWorkoutHistory()}</View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        color: '#1D1617',
        fontWeight: '600',
        lineHeight: 24
    },
    subtitle_gray: {
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 18,
        color: '#ADA4A5'
    },
    workoutHistoryWrapper: {
        alignItems: 'center',
        width: '100%'
    },
    workoutProgressHeader: {
        marginTop: 33,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    workoutList: {
        marginTop: 20,
        rowGap: 15,
        alignContent: 'center',
        justifyContent: 'center',
        width: SCREEN_WIDTH,
        paddingBottom: 20
    },
    workoutsSkeleton: {
        width: SCREEN_WIDTH * 0.9,
        alignSelf: 'center'
    },
    workoutItem: {
        width: SCREEN_WIDTH * 0.9,
        height: 80
    },
    noWorkoutText: {
        fontSize: 14,
        color: '#ADA4A5',
        fontWeight: '400',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 50
    }
})
