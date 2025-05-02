import { useEffect, useRef, useCallback } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import BottomSheet, { BottomSheetBackdrop, BottomSheetFlatListMethods } from '@gorhom/bottom-sheet'
import Thumbnail from './Components/Thumbnail'
import CategoryInfo from './Components/CategoryInfo/CategoryInfo'
import ExerciseList from './Components/ExerciseList/ExerciseList'

import { COLOR_BRANDS } from '@/constants/common.constants'
import { RootStackScreenProps } from '@/navigation/types'
import useInteractionReadyState from '@/hooks/useInteractionReadyState'
import BlankScreenLoader from '@/components/BlankScreenLoader'
import { useCategoryDetailData } from '@/hooks/useCategoryDetailData'
import { scrollToExerciseById } from '@/utils/scrollHelpers'
import Header from './Components/Header'

function CategoryDetail({ route, navigation }: RootStackScreenProps<'CategoryDetail'>) {
    const { category_id, exercise_id } = route.params
    const exerciseListRef = useRef<BottomSheetFlatListMethods>(null)
    const { category, isLoading, workoutList } = useCategoryDetailData(category_id)

    const { isReady } = useInteractionReadyState()

    useEffect(() => {
        scrollToExerciseById(exerciseListRef, workoutList, exercise_id)
    }, [exercise_id, workoutList])

    const handleWorkoutPress = useCallback(
        (id: string) => navigation.navigate('WorkoutDetail', { workout_id: id }),
        [navigation]
    )
    if (!isReady) {
        return <BlankScreenLoader />
    }
    return (
        <LinearGradient
            colors={COLOR_BRANDS.primary}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            style={styles.content}
        >
            <SafeAreaView style={styles.container}>
                <Header onBack={navigation.goBack} />
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
                            style={{ height: 0 }}
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
