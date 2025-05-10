import React, { useCallback, memo } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, FlatList, ListRenderItemInfo } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { activityApi } from '@/services/rest'
import ActivityItem from '../ActivityItem/ActivityItem'
import LatestActivitySkeleton from '../LatestActivitySkeleton'
import EmptyComponentV2 from '@/components/EmptyComponentV2'
import { defaultKeyExtractor } from '@/utils/list'
import { UserActivity } from '@/types/userActivity.type'

interface LatestActivityProps {
    isReadyRender?: boolean
}

function LatestActivity({ isReadyRender }: LatestActivityProps) {
    const navigation = useNavigation()

    const { data, isLoading } = useQuery({
        queryKey: ['latest-activity-preview'],
        queryFn: async () => {
            const response = await activityApi.getDailyActivity({ page: 1, limit: 3 })
            return response.data
        },
        staleTime: 60 * 1000
    })

    const activities = data?.data || []

    const handleSeeMore = useCallback(() => {
        navigation.navigate('ActivityList')
    }, [navigation])

    const renderItem = useCallback(({ item }: ListRenderItemInfo<UserActivity>) => <ActivityItem data={item} />, [])

    const canRender = !isLoading && isReadyRender
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.sectionTitle}>Latest Activity</Text>
                {activities.length > 0 && (
                    <TouchableOpacity onPress={handleSeeMore}>
                        <Text style={styles.seeMoreText}>See more</Text>
                    </TouchableOpacity>
                )}
            </View>

            {canRender ? (
                <FlatList
                    data={activities}
                    keyExtractor={defaultKeyExtractor}
                    renderItem={renderItem}
                    scrollEnabled={false}
                    ListEmptyComponent={<EmptyComponentV2 message='No activity yet' />}
                />
            ) : (
                <LatestActivitySkeleton />
            )}
        </View>
    )
}

export default memo(LatestActivity)

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
    emptyContainer: {
        flex: 1,
        position: 'relative'
    },
    emptyText: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '400',
        color: '#ADA4A5',
        position: 'absolute',
        bottom: 10,
        left: '50%',
        transform: [{ translateX: '-50%' }]
    },
    emptyIcon: {
        width: 350,
        height: 200,
        alignItems: 'center'
    }
})
