import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavigationBar from '@/components/NavigationBar'
import { useInfiniteQuery } from '@tanstack/react-query'
import { activityApi } from '@/services/rest'
import Loader from '@/components/Loader'
import { RootStackScreenProps } from '@/navigation/types'
import ActivityItem from '../ActivityTracker/Components/ActivityItem'

function ActivityListScreen({ navigation }: RootStackScreenProps<'ActivityList'>) {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
        queryKey: ['activity-list-full'],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await activityApi.getDailyActivity({
                params: { page: pageParam, limit: 10 }
            })
            return response.data
        },
        getNextPageParam: ({ meta }) => (meta.current_page < meta.total_page ? meta.current_page + 1 : undefined),
        initialPageParam: 1
    })

    const activities = data?.pages.flatMap((page) => page.data) || []

    const handleLoadMore = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
        }
    }

    const renderFooter = () =>
        isFetchingNextPage ? (
            <View style={styles.loadingFooter}>
                <Loader />
            </View>
        ) : null

    const renderEmpty = () => <Text style={styles.emptyText}>No activity found</Text>

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.header}>
                <NavigationBar title='Today Activity' callback={navigation.goBack} />
            </SafeAreaView>

            {isLoading ? (
                <View style={styles.loader}>
                    <Loader />
                </View>
            ) : (
                <FlatList
                    contentContainerStyle={styles.listContent}
                    data={activities}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <ActivityItem data={item} />}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={renderFooter}
                    ListEmptyComponent={renderEmpty}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    header: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5'
    },
    listContent: {
        padding: 20,
        paddingBottom: 30
    },
    loadingFooter: {
        paddingVertical: 20,
        alignItems: 'center'
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyText: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '400',
        color: '#ADA4A5'
    }
})

export default ActivityListScreen
