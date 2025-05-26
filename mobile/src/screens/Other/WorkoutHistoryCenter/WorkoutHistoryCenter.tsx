import React, { useState, useCallback, useMemo } from 'react'
import { View, StyleSheet, SafeAreaView, ListRenderItem } from 'react-native'
import { useWorkoutHistory } from '@/hooks/useWorkoutHistory'
import { useCategories } from '@/hooks/useCategoriesData'
import useDebounce from '@/hooks/useDebounce'
import { RootStackScreenProps } from '@/navigation/types'
import { workoutHistory } from '@/types/workoutHistory.type'

import TrainingSessionCard from '@/components/TrainingSessionCard'
import Header from './components/Header'
import ModalSelectCategory from './components/ModalSelectCategory'
import BottomNavigation from './components/BottomNavigation'
import WorkoutList from './components/WorkoutlList/WorkoutList'
import useInteractionReadyState from '@/hooks/useInteractionReadyState'
import BlankScreenLoader from '@/components/BlankScreenLoader'

type ViewModeType = 'weekly' | 'monthly' | 'all'

const WorkoutHistoryCenter: React.FC<RootStackScreenProps<'WorkoutHistoryCenter'>> = ({ navigation }) => {
    const { isReady } = useInteractionReadyState()

    const [modalVisible, setModalVisible] = useState(false)
    const [selectedWorkout, setSelectedWorkout] = useState<string>('All workout')
    const [categoryId, setCategoryId] = useState<string | null>(null)
    const [viewMode, setViewMode] = useState<ViewModeType>('weekly')

    const debouncedCategoryId = useDebounce(categoryId, 200)
    const debouncedViewMode = useDebounce(viewMode, 200)

    const { categoriesData, categoriesLoading } = useCategories()
    const { data, isLoading, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage } = useWorkoutHistory(
        debouncedCategoryId,
        debouncedViewMode
    )

    const workouts = useMemo(() => data?.pages.flatMap((page) => page.data) || [], [data])
    const handleSelectWorkout = (id: string | null, name: string = 'All workout') => {
        setSelectedWorkout(name)
        setCategoryId(id)
        setModalVisible(false)
    }

    const toggleModal = useCallback(() => {
        setModalVisible((prev) => !prev)
    }, [])

    const handleItemPress = useCallback(
        (id: string) => {
            navigation.navigate('WorkoutSummaryDetail', { workout_id: id })
        },
        [navigation]
    )

    const renderItem: ListRenderItem<workoutHistory> = useCallback(
        ({ item }) => (
            <View style={styles.cardWrapper}>
                <TrainingSessionCard item={item} onPress={() => handleItemPress(item.id)} />
            </View>
        ),
        [handleItemPress]
    )

    if (!isReady) {
        return <BlankScreenLoader />
    }
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Header
                    style={styles.header}
                    headerTitle={selectedWorkout}
                    onBackPress={navigation.goBack}
                    onTitlePress={toggleModal}
                />

                <View style={styles.content}>
                    <WorkoutList
                        fetchNextPage={fetchNextPage}
                        hasNextPage={hasNextPage}
                        isFetching={isFetching}
                        isFetchingNextPage={isFetchingNextPage}
                        isLoading={isLoading}
                        renderItem={renderItem}
                        workouts={workouts}
                    />
                </View>

                <BottomNavigation viewMode={viewMode} setViewMode={setViewMode} />

                <ModalSelectCategory
                    categoriesData={categoriesData}
                    modalVisible={modalVisible}
                    onCloseModal={toggleModal}
                    selectedWorkout={selectedWorkout}
                    setSelectedWorkout={handleSelectWorkout}
                    isLoading={categoriesLoading}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1
    },
    container: {
        flex: 1
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10
    },
    content: {
        flex: 1
    },
    cardWrapper: {
        paddingHorizontal: 10
    }
})

export default WorkoutHistoryCenter
