import React from 'react'

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { useQuery } from '@tanstack/react-query'

import { activityApi } from '@/services/rest'

import ActivityCartSkeleton from '@/components/ActivityCartSkeleton' // Import component skeleton

import ActivityItem from '../ActivityItem/ActivityItem'

function LatestActivity() {
    const navigation = useNavigation()

    const { data, isLoading } = useQuery({
        queryKey: ['latest-activity-preview'],
        queryFn: async () => {
            const response = await activityApi.getDailyActivity({
                params: { page: 1, limit: 3 }
            })
            return response.data
        },
        staleTime: 60 * 1000
    })

    const activities = data?.data || []

    const handleSeeMore = () => {
        navigation.navigate('ActivityList')
    }

    const renderEmpty = () => <Text style={styles.emptyText}>No activity yet</Text>

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

            {isLoading ? (
                <View>
                    <ActivityCartSkeleton />
                    <ActivityCartSkeleton />
                    <ActivityCartSkeleton />
                </View>
            ) : activities.length > 0 ? (
                <View>
                    {activities.map((item) => (
                        <ActivityItem key={item.id.toString()} data={item} />
                    ))}
                </View>
            ) : (
                renderEmpty()
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
    emptyText: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '400',
        color: '#ADA4A5'
    }
})
