import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, FlatList, View } from 'react-native'

import { useInfiniteQuery } from '@tanstack/react-query'
import { activityApi } from '@/services/rest'
import Loader from '@/components/Loader'
import ActivityItem from '../ActivityItem/ActivityItem'

import { ResponseAPIActivityPage } from '@/types/userActivity.type'

function LatestActivity() {
    const [isExpanded, setIsExpanded] = useState(false)

    const queryConfig = useInfiniteQuery<ResponseAPIActivityPage, Error>({
        queryKey: ['latest-activity'],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await activityApi.getDailyActivity({
                params: { page: pageParam as number, limit: 5 }
            })
            return response.data
        },
        getNextPageParam: ({ meta }) => (meta.current_page < meta.total_page ? meta.current_page + 1 : undefined),
        initialPageParam: 1,
        staleTime: 60 * 1000
    })

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = queryConfig

    const activities = data?.pages.flatMap((page) => page.data) || []

    const handleSeeMore = () => setIsExpanded(true)

    const handleLoadMore = () => {
        if (hasNextPage && !isFetchingNextPage && isExpanded) {
            fetchNextPage()
        }
    }

    const renderItem = ({ item }: any) => <ActivityItem data={item} />

    const renderFooter = () =>
        isFetchingNextPage ? (
            <View style={styles.loadingWrapper}>
                <Loader />
            </View>
        ) : null

    const renderEmpty = () => <Text style={styles.emptyText}>No activity yet</Text>

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.sectionTitle}>Latest Activity</Text>
                {!isExpanded && activities.length > 0 && hasNextPage && (
                    <TouchableOpacity onPress={handleSeeMore}>
                        <Text style={styles.seeMoreText}>See more</Text>
                    </TouchableOpacity>
                )}
            </View>

            {isLoading && !isExpanded ? (
                <Loader />
            ) : (
                <FlatList
                    scrollEnabled={false}
                    data={activities}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.2}
                    ListFooterComponent={renderFooter}
                    ListEmptyComponent={renderEmpty}
                    keyboardShouldPersistTaps='handled'
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
        fontSize: 12,
        fontWeight: '500',
        color: '#ADA4A5'
    },
    loadingWrapper: {
        alignItems: 'center',
        paddingVertical: 12
    },
    emptyText: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '400',
        color: '#ADA4A5'
    }
})
