import React, { memo, useCallback } from 'react'
import { FlatList, RefreshControl, View, StyleSheet, Text, ListRenderItem } from 'react-native'
import LottieView from 'lottie-react-native'
import TrainingSessionCard from '@/components/TrainingSessionCard'
import Loader from '@/components/Loader'
import { workoutHistory } from '@/types/workoutHistory.type'

interface WorkoutListProps {
    data: workoutHistory[]
    isFetching: boolean
    isFetchingNextPage: boolean
    hasNextPage?: boolean
    fetchNextPage: () => void
    onRefresh: () => void
    onPressItem: (id: string) => void
}

const EmptyState = () => (
    <View style={styles.emptyContainer}>
        <LottieView source={require('@/assets/animations/stats.json')} autoPlay loop style={styles.emptyImage} />
        <Text style={styles.emptyText}>No workouts found.</Text>
    </View>
)

const FooterLoader = () => (
    <View style={styles.footerLoader}>
        <Loader />
    </View>
)

const WorkoutList = ({
    data,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    onRefresh,
    onPressItem
}: WorkoutListProps) => {
    const renderItem: ListRenderItem<workoutHistory> = useCallback(
        ({ item }) => <TrainingSessionCard item={item} onPress={() => onPressItem(item.id)} />,
        [onPressItem]
    )

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            contentContainerStyle={data.length === 0 ? styles.emptyListContent : styles.listContent}
            renderItem={renderItem}
            ListEmptyComponent={<EmptyState />}
            onEndReached={() => {
                if (hasNextPage && !isFetchingNextPage) fetchNextPage()
            }}
            onEndReachedThreshold={0.5}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={isFetchingNextPage ? <FooterLoader /> : null}
            refreshControl={<RefreshControl refreshing={isFetching && !isFetchingNextPage} onRefresh={onRefresh} />}
        />
    )
}

export default memo(WorkoutList)

const styles = StyleSheet.create({
    listContent: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        gap: 10
    },
    emptyListContent: {
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
        justifyContent: 'center',
        flex: 1
    },
    emptyText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#ADA4A5',
        textAlign: 'center'
    },
    emptyImage: {
        width: 250,
        height: 250
    }
})
