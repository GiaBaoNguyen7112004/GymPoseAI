import { View, StyleSheet } from 'react-native'
import { memo, useCallback, useEffect, useRef } from 'react'
import { BottomSheetFlatList, BottomSheetFlatListMethods } from '@gorhom/bottom-sheet'

import WorkoutCard from '@/components/WorkoutCard'
import ExerciseCartSkeleton from '@/components/ExerciseCartSkeleton'
import { Exercise } from '@/types/exercises.type'
import { scrollToExerciseById } from '@/utils/scrollHelpers'
import useWorkoutListOfCategoryData from '@/hooks/useWorkoutListOfCategoryData'
import EmptyComponent from '@/components/EmptyComponent'

interface ExerciseListProps {
    highlightedId?: string
    onPressWorkout: (id: string) => void
    categoryId: string
}

function ExerciseList({ highlightedId, onPressWorkout, categoryId }: ExerciseListProps) {
    const listRef = useRef<BottomSheetFlatListMethods>(null)

    const { workoutList, isLoading } = useWorkoutListOfCategoryData({ categoryId })

    useEffect(() => {
        scrollToExerciseById(listRef, workoutList, highlightedId)
    }, [highlightedId, workoutList])

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
            data={workoutList}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            ListEmptyComponent={<EmptyComponent />}
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
