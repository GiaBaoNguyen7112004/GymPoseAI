import { useEffect, useMemo, useRef, useCallback } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { LinearGradient } from 'expo-linear-gradient'
import BottomSheet, { BottomSheetBackdrop, BottomSheetFlatListMethods } from '@gorhom/bottom-sheet'

import Header from '@/screens/Main/Home/components/Header/Header'
import Thumbnail from './Components/Thumbnail'
import CategoryInfo from './Components/CategoryInfo/CategoryInfo'
import ExerciseList from './Components/ExerciseList/ExerciseList'

import { COLOR_BRANDS } from '@/constants/common.constants'
import { RootStackScreenProps } from '@/navigation/types'
import { workoutApi, categoriesApi } from '@/services/rest'
import { Exercise } from '@/types/exercises.type'

function CategoryDetail({ route, navigation }: RootStackScreenProps<'CategoryDetail'>) {
    const { category_id, exercise_id } = route.params
    const exerciseListRef = useRef<BottomSheetFlatListMethods>(null)

    const { data: workoutData, isLoading } = useQuery({
        queryKey: ['workout-category', category_id],
        queryFn: () => workoutApi.getWorkoutByCategoryId({ id: category_id }),
        staleTime: 30_000
    })

    const { data: categoryRes } = useQuery({
        queryKey: ['category', category_id],
        queryFn: () => categoriesApi.getCategoriesById({ id: category_id })
    })

    const workoutList = useMemo(() => workoutData?.data.data || [], [workoutData])
    const category = useMemo(() => categoryRes?.data.data, [categoryRes])

    useEffect(() => {
        if (exercise_id && workoutList.length > 0) {
            const index = workoutList.findIndex((item: Exercise) => item.id === exercise_id)
            if (index !== -1 && exerciseListRef.current) {
                requestAnimationFrame(() => {
                    exerciseListRef.current?.scrollToIndex({ index, animated: true })
                })
            }
        }
    }, [exercise_id, workoutList])

    const handleWorkoutPress = useCallback(
        (id: string) => navigation.navigate('WorkoutDetail', { workout_id: id }),
        [navigation]
    )

    return (
        <LinearGradient
            colors={COLOR_BRANDS.primary}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            style={styles.content}
        >
            <SafeAreaView style={styles.container}>
                <Header handleNotificationClick={navigation.goBack} />
                <Thumbnail category={category} />
                <BottomSheet
                    index={exercise_id ? 1 : 0}
                    snapPoints={['72%', '90%']}
                    enablePanDownToClose={false}
                    enableContentPanningGesture={false}
                    enableDynamicSizing={false}
                    backdropComponent={(props) => (
                        <BottomSheetBackdrop
                            {...props}
                            appearsOnIndex={-1}
                            disappearsOnIndex={-1}
                            pressBehavior='none'
                            enableTouchThrough
                        />
                    )}
                >
                    <CategoryInfo category={category} />
                    <ExerciseList
                        data={workoutList}
                        isLoading={isLoading}
                        highlightedId={exercise_id}
                        onPressWorkout={handleWorkoutPress}
                        listRef={exerciseListRef}
                    />
                </BottomSheet>
            </SafeAreaView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { flex: 1 }
})
export default CategoryDetail
