import React, { memo, useCallback } from 'react'
import { FlatList, RefreshControl, View, StyleSheet, Text, ListRenderItem } from 'react-native'
import LottieView from 'lottie-react-native'
import TrainingSessionCard from '@/components/TrainingSessionCard'
import Loader from '@/components/Loader'
import { workoutHistory } from '@/types/workoutHistory.type'
import { defaultKeyExtractor } from '@/utils/list'
import EmptyState from './EmptyState'
import FooterLoader from './FooterLoader'

interface WorkoutListProps {
    data: workoutHistory[]
    isFetching: boolean
    isFetchingNextPage: boolean
    hasNextPage?: boolean
    fetchNextPage: () => void
    onRefresh: () => void
    onPressItem: (id: string) => void
}

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
            keyExtractor={defaultKeyExtractor}
            contentContainerStyle={styles.listContent}
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
        gap: 10,
        flexGrow: 1
    }
})
