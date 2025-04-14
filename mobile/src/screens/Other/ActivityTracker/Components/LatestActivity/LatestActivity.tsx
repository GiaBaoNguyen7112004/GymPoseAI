import { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, FlatList, View } from 'react-native'
import { useInfiniteQuery } from '@tanstack/react-query'
import activityApi from '@/src/services/rest/acitity.rest'
import { UserActivity } from '@/src/types/userActivity.type'
import { PaginationMeta, ResponseApi } from '@/src/types/utils.type'
import ActivityItem from '../ActivityItem/ActivityItem'
import Loader from '@/src/components/Loader'

function LatestActivity() {
    const [isSeeMoreClicked, setIsSeeMoreClicked] = useState(false)

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery<
        ResponseApi<UserActivity[], PaginationMeta>,
        Error
    >({
        queryKey: ['latest-activity'],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await activityApi.getDailyActivity({
                params: { page: pageParam as number, limit: 5 }
            })
            return response.data
        },
        getNextPageParam: (lastPage) => {
            const { current_page, total_page } = lastPage.meta
            return current_page < total_page ? current_page + 1 : undefined
        },
        initialPageParam: 1,
        staleTime: 1000 * 60
    })

    const activities = data?.pages.flatMap((page) => page.data) || []

    const handleSeeMore = () => setIsSeeMoreClicked(true)

    const handleLoadMore = () => {
        if (hasNextPage && !isFetchingNextPage && isSeeMoreClicked) {
            fetchNextPage()
        }
    }

    const renderFooter = () =>
        isFetchingNextPage ? (
            <View style={styles.loadingWrapper}>
                <Loader />
            </View>
        ) : null

    const renderEmptyComponent = () => <Text style={styles.emptyText}>No activity yet</Text>

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.sectionTitle}>Latest Activity</Text>
                {!isSeeMoreClicked && activities.length > 0 && hasNextPage && (
                    <TouchableOpacity onPress={handleSeeMore}>
                        <Text style={styles.seeMoreText}>See more</Text>
                    </TouchableOpacity>
                )}
            </View>

            {isLoading && !isSeeMoreClicked ? (
                <Loader />
            ) : (
                <FlatList
                    data={activities}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <ActivityItem data={item} />}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                    keyboardShouldPersistTaps='handled'
                    ListFooterComponent={renderFooter}
                    ListEmptyComponent={renderEmptyComponent}
                />
            )}
        </View>
    )
}

export default LatestActivity

const styles = StyleSheet.create({
    container: {
        marginBottom: 16
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 18
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1D1617'
    },
    seeMoreText: {
        color: '#ADA4A5',
        fontSize: 12,
        fontWeight: '500'
    },
    loadingWrapper: {
        alignItems: 'center',
        paddingVertical: 12
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 15,
        fontWeight: 400,
        color: '#ADA4A5'
    }
})
