import { View, StyleSheet, SafeAreaView } from 'react-native'
import { MainTabScreenProps } from '@/navigation/types'
import { Category } from '@/types/exercises.type'
import CategoryBottomSheet from './Components/CategoryBottomSheet'
import LineChartWorkout from './Components/LineChartWorkout'
import Header from './Components/Header'
import { useCallback } from 'react'
import ViewLinerGradient from '@/components/ViewLinerGradient'
import useInteractionReadyState from '@/hooks/useInteractionReadyState'
import BlankScreenLoader from '@/components/BlankScreenLoader'

function WorkoutTracker({ navigation }: MainTabScreenProps<'WorkoutTracker'>) {
    const { isReady } = useInteractionReadyState()
    const handleCategoryPress = useCallback((category: Category) => {
        navigation.navigate('CategoryDetail', { category_id: category.id })
    }, [])
    const goBackScreen = useCallback(() => {
        navigation.goBack()
    }, [])
    if (!isReady) return <BlankScreenLoader />
    return (
        <ViewLinerGradient style={styles.BackgroundLinerWrapper}>
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <Header goBackScreen={goBackScreen} />
                    <LineChartWorkout />
                    <CategoryBottomSheet handleCategoryPress={handleCategoryPress} />
                </View>
            </SafeAreaView>
        </ViewLinerGradient>
    )
}

export default WorkoutTracker

const styles = StyleSheet.create({
    BackgroundLinerWrapper: {
        flex: 1
    },
    container: {
        flex: 1
    },
    content: {
        flex: 1
    },
    header: {
        marginTop: 10
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700'
    }
})
