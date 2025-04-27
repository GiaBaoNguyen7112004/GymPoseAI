import { useContext, useMemo, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    FlatList,
    RefreshControl,
    Image
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'
import { WINDOW_WIDTH } from '@gorhom/bottom-sheet'

import NavigationBar from '@/components/NavigationBar'
import TabBar from './Components/TabBar'
import FilterBar from './Components/FilterBar'
import TrainingSessionCard from '@/components/TrainingSessionCard'
import Loader from '@/components/Loader'
import LoaderModal from '@/components/LoaderModal'

import { AppContext } from '@/Contexts/App.context'
import { workoutHistoryApi } from '@/services/rest'
import { RootStackScreenProps } from '@/navigation/types'
import { categories, QueryConfigWorkoutHistory, ResponseAPIWorkoutHistoryPage } from '@/types/workoutHistory.type'
import { ViewModeType } from '@/types/utils.type'

function WorkoutHistoryCenter({ navigation }: RootStackScreenProps<'WorkoutHistoryCenter'>) {
    const { profile } = useContext(AppContext)

    const [category, setCategory] = useState<categories>('full body')
    const [viewMode, setViewMode] = useState<ViewModeType>('weekly')
    const [order, setOrder] = useState<'asc' | 'desc'>('asc')

    const queryConfig = useMemo<QueryConfigWorkoutHistory>(
        () => ({
            page: 1,
            limit: 10,
            category,
            viewMode,
            sort_by: 'createAt',
            order
        }),
        [category, viewMode, order]
    )

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isFetching, refetch } = useInfiniteQuery<
        ResponseAPIWorkoutHistoryPage,
        Error
    >({
        queryKey: ['workout-history-screen', category, viewMode, order],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await workoutHistoryApi.getWorkoutHistory({
                params: { ...queryConfig, page: pageParam as number },
                user_id: profile?.id || ''
            })
            return response.data
        },
        getNextPageParam: (lastPage) => {
            const { current_page, total_page } = lastPage.meta
            return current_page < total_page ? current_page + 1 : undefined
        },
        initialPageParam: 1,
        placeholderData: keepPreviousData,
        staleTime: 1000 * 60 * 5
    })

    const workouts = data?.pages.flatMap((page) => page.data) || []

    const handleTabChange = (value: string) => setCategory(value as categories)
    const handleViewModeChange = (value: string) => setViewMode(value as ViewModeType)
    const handleOrderChange = () => setOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    const handleWorkoutCardClick = (workoutId: string) => {
        navigation.navigate('WorkoutHistoryDetail', { workout_id: workoutId })
    }

    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Image source={require('@/assets/images/workout.png')} style={styles.emptyImage} resizeMode='contain' />
            <Text style={styles.emptyText}>No workouts found.</Text>
        </View>
    )

    return (
        <View style={styles.container}>
            {isLoading && <LoaderModal title='Loading' />}
            <SafeAreaView style={styles.header}>
                <NavigationBar
                    title='Workout History'
                    callback={navigation.goBack}
                    buttonBackStyle={styles.buttonBack}
                    headingStyle={styles.headerTitle}
                    iconColor='#FFF'
                />
            </SafeAreaView>

            <View style={styles.mainContent}>
                <View style={styles.sidebar}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
                        <TabBar activeTab={category} onChangeTab={handleTabChange} />
                    </ScrollView>

                    <View style={styles.filters}>
                        <TouchableOpacity style={styles.sortButton} onPress={handleOrderChange}>
                            <Text style={styles.sortText}>Sort</Text>
                            <Ionicons
                                name={order === 'asc' ? 'chevron-up' : 'chevron-down'}
                                size={16}
                                color='#93A7FE'
                            />
                        </TouchableOpacity>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.viewModeContainer}>
                            <FilterBar activeFilterProp={viewMode} onChangeFilter={handleViewModeChange} />
                        </ScrollView>
                    </View>
                </View>

                <FlatList
                    data={workouts}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={workouts.length === 0 ? styles.listContentEmpty : styles.listContent}
                    renderItem={({ item }) => (
                        <TrainingSessionCard item={item} onPress={() => handleWorkoutCardClick(item.id)} />
                    )}
                    ListEmptyComponent={renderEmptyComponent}
                    onEndReached={() => {
                        if (hasNextPage && !isFetchingNextPage) fetchNextPage()
                    }}
                    onEndReachedThreshold={0.5}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={
                        isFetchingNextPage ? (
                            <View style={styles.footerLoader}>
                                <Loader />
                            </View>
                        ) : null
                    }
                    refreshControl={
                        <RefreshControl refreshing={isFetching && !isFetchingNextPage} onRefresh={refetch} />
                    }
                />
            </View>
        </View>
    )
}

export default WorkoutHistoryCenter

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#92A3FD'
    },
    header: {
        height: 70,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700'
    },
    buttonBack: {
        backgroundColor: 'transparent',
        color: '#FFF'
    },
    mainContent: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        borderTopLeftRadius: 40,
        marginTop: 8,
        paddingTop: 16
    },
    sidebar: {
        marginBottom: 6
    },
    tabsContainer: {
        height: 40,
        width: WINDOW_WIDTH * 0.9,
        alignSelf: 'center',
        marginBottom: 4
    },
    filters: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingLeft: 16,
        gap: 12,
        backgroundColor: '#FFF',
        width: WINDOW_WIDTH * 0.9,
        alignSelf: 'center',
        borderRadius: 10
    },
    sortButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    },
    sortText: {
        color: '#4b5563'
    },
    viewModeContainer: {},
    listContent: {
        paddingHorizontal: 16,
        paddingVertical: 30,
        gap: 16
    },
    listContentEmpty: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 16
    },
    footerLoader: {
        alignItems: 'center',
        paddingVertical: 12
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#ADA4A5'
    },
    emptyImage: {
        width: 150,
        height: 150,
        marginBottom: 16
    }
})
