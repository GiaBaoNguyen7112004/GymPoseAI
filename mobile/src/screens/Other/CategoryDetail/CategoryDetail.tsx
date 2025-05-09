import { useCallback } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import BottomSheet from '@gorhom/bottom-sheet'
import Thumbnail from './Components/Thumbnail'
import CategoryInfo from './Components/CategoryInfo/CategoryInfo'
import ExerciseList from './Components/ExerciseList/ExerciseList'

import { RootStackScreenProps } from '@/navigation/types'
import Header from './Components/Header'
import ViewLinerGradient from '@/components/ViewLinerGradient'
import useCategoryData from '@/hooks/useCategoryData'
import InvisibleBackdrop from '@/components/InvisibleBackdrop'

function CategoryDetail({ route, navigation }: RootStackScreenProps<'CategoryDetail'>) {
    const { category_id, exercise_id } = route.params

    const { category } = useCategoryData({ category_id })

    const handleWorkoutPress = useCallback(
        (id: string) => navigation.navigate('ExerciseDetail', { workout_id: id }),
        [navigation]
    )

    return (
        <ViewLinerGradient style={styles.content}>
            <SafeAreaView style={styles.container}>
                <Header onBack={navigation.goBack} />
                <Thumbnail category={category} />
                <BottomSheet
                    index={exercise_id ? 1 : 0}
                    snapPoints={['72%', '90%']}
                    enablePanDownToClose={false}
                    enableContentPanningGesture={false}
                    enableDynamicSizing={false}
                    backdropComponent={InvisibleBackdrop}
                >
                    <CategoryInfo category={category} />
                    <ExerciseList
                        highlightedId={exercise_id}
                        categoryId={category_id}
                        onPressWorkout={handleWorkoutPress}
                    />
                </BottomSheet>
            </SafeAreaView>
        </ViewLinerGradient>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { flex: 1 }
})
export default CategoryDetail
