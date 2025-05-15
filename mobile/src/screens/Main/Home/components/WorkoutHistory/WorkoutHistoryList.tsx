import React, { memo, useCallback } from 'react'
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native'
import TrainingSessionCard from '@/components/TrainingSessionCard'
import WorkoutCardSkeleton from '@/components/TrainingSessionCardSkeleton'
import { defaultKeyExtractor } from '@/utils/list'
import { SCREEN_WIDTH } from '@/constants/devices.constant'
import { workoutHistory } from '@/types/workoutHistory.type'
import EmptyComponentV2 from '@/components/EmptyComponentV2'

interface Props {
    data?: any[]
    isLoading: boolean
    onPressItem: (id: string) => void
}

function WorkoutHistoryList({ data, isLoading, onPressItem }: Props) {
    if (isLoading) {
        return (
            <View style={styles.skeletons}>
                {[...Array(3)].map((_, idx) => (
                    <WorkoutCardSkeleton key={idx} />
                ))}
            </View>
        )
    }

    const renderItem = useCallback(
        ({ item }: ListRenderItemInfo<workoutHistory>) => (
            <TrainingSessionCard item={item} style={styles.workoutItem} onPress={() => onPressItem(item.id)} />
        ),
        []
    )

    return (
        <FlatList
            data={data}
            keyExtractor={defaultKeyExtractor}
            renderItem={renderItem}
            ListEmptyComponent={<EmptyComponentV2 message='No workouts yet.' />}
            scrollEnabled={false}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
        />
    )
}
export default memo(WorkoutHistoryList)
const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 20,
        gap: 10
    },
    skeletons: {
        width: SCREEN_WIDTH * 0.9,
        alignSelf: 'center'
    },
    workoutItem: {
        width: SCREEN_WIDTH * 0.9,
        height: 80
    },
    emptyText: {
        fontSize: 14,
        color: '#ADA4A5',
        fontWeight: '400',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 50
    }
})
