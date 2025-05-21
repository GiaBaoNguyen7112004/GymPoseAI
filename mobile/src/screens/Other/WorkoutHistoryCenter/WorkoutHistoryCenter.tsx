import { useCallback, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { useWorkoutHistory } from '@/hooks/useWorkoutHistory'
import LoaderModal from '@/components/LoaderModal'
import { RootStackScreenProps } from '@/navigation/types'
import Header from './Components/Header'
import FilterControls from './Components/FilterControls'
import WorkoutList from './Components/WorkoutList'
import { Filter } from './Components/FilterBar/FilterBar'

export default function WorkoutHistoryScreen({ navigation }: RootStackScreenProps<'WorkoutHistoryCenter'>) {
    const [category, setCategory] = useState<string>('')
    const [viewMode, setViewMode] = useState<Filter>('weekly')
    const [order, setOrder] = useState<'asc' | 'desc'>('asc')

    const { data, isLoading, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage, refetch } = useWorkoutHistory(
        category,
        viewMode,
        order
    )

    const handleChangeSortMode = useCallback(() => setOrder((prev) => (prev === 'asc' ? 'desc' : 'asc')), [])

    const handleItemPress = useCallback((id: string) => {
        navigation.navigate('WorkoutSummaryDetail', { workout_id: id })
    }, [])

    const workouts = data?.pages.flatMap((page) => page.data) || []

    return (
        <View style={styles.container}>
            <Header onBack={navigation.goBack} />
            <View style={styles.mainContent}>
                <FilterControls
                    category_id={category}
                    viewMode={viewMode}
                    order={order}
                    onCategoryChange={setCategory}
                    onViewModeChange={setViewMode}
                    onOrderChange={handleChangeSortMode}
                />
                <View style={{ flex: 1 }}>
                    <LoaderModal isVisible={isLoading} />
                    <WorkoutList
                        data={workouts}
                        isFetching={isFetching}
                        isFetchingNextPage={isFetchingNextPage}
                        hasNextPage={hasNextPage}
                        fetchNextPage={fetchNextPage}
                        onRefresh={refetch}
                        onPressItem={handleItemPress}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#92A3FD'
    },
    mainContent: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        borderTopLeftRadius: 40,
        marginTop: 8,
        paddingTop: 16
    }
})
