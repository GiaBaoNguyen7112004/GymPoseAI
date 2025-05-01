import { View, StyleSheet } from 'react-native'
import { memo, RefObject, useCallback } from 'react'
import { BottomSheetFlatList, BottomSheetFlatListMethods } from '@gorhom/bottom-sheet'

import WorkoutCard from '@/components/WorkoutCard'
import ExerciseCartSkeleton from '@/components/ExerciseCartSkeleton'
import { Exercise } from '@/types/exercises.type'

interface ExerciseListProps {
    data: Exercise[]
    isLoading: boolean
    highlightedId?: string
    onPressWorkout: (id: string) => void
    listRef: RefObject<BottomSheetFlatListMethods>
}

function ExerciseList({ data, isLoading, highlightedId, onPressWorkout, listRef }: ExerciseListProps) {
    const renderItem = useCallback(
        ({ item }: { item: Exercise }) => (
            <WorkoutCard
                itemData={item}
                onPress={() => onPressWorkout(item.id)}
                isHighlighted={item.id === highlightedId}
            />
        ),
        [onPressWorkout, highlightedId]
    )

    const keyExtractor = useCallback((item: Exercise) => item.id, [])

    const handleScrollToIndexFailed = useCallback(
        (info: { index: number }) => {
            setTimeout(() => {
                listRef.current?.scrollToIndex({
                    index: info.index,
                    animated: true
                })
            }, 500)
        },
        [listRef]
    )

    if (isLoading) {
        return (
            <View style={styles.skeleton}>
                {Array.from({ length: 4 }).map((_, i) => (
                    <ExerciseCartSkeleton key={i} />
                ))}
            </View>
        )
    }

    return (
        <BottomSheetFlatList
            ref={listRef}
            data={data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
            scrollEnabled
            onScrollToIndexFailed={handleScrollToIndexFailed}
        />
    )
}

const styles = StyleSheet.create({
    skeleton: {
        width: '90%'
    }
})

export default memo(ExerciseList)
