import { workoutHistory } from '@/types/workoutHistory.type'
import React, { memo } from 'react'
import { ListRenderItem, StyleSheet } from 'react-native'
import { FlatList } from 'react-native'
import HeaderBanner from './HeaderBanner'
import EmptyOrLoading from './EmptyOrLoading'
import LoadingFooter from './LoadingFooter'

interface WorkoutListProps {
    workouts: workoutHistory[]
    renderItem: ListRenderItem<workoutHistory>
    isLoading: boolean
    isFetching: boolean
    isFetchingNextPage: boolean
    hasNextPage: boolean
    fetchNextPage: () => void
}

const WorkoutList: React.FC<WorkoutListProps> = ({
    workouts,
    renderItem,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage
}) => {
    return (
        <FlatList
            style={styles.flatListWrapper}
            data={workouts}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={<HeaderBanner />}
            ListEmptyComponent={<EmptyOrLoading isLoading={isLoading || isFetching} />}
            ListFooterComponent={isFetchingNextPage ? <LoadingFooter /> : null}
            contentContainerStyle={styles.contentContainer}
            onEndReached={() => {
                if (hasNextPage && !isFetchingNextPage) {
                    fetchNextPage()
                }
            }}
            onEndReachedThreshold={0.2}
            showsVerticalScrollIndicator={false}
        />
    )
}

const styles = StyleSheet.create({
    flatListWrapper: {
        flex: 1,
        backgroundColor: 'white'
    },
    contentContainer: {
        flexGrow: 1,
        backgroundColor: 'white',
        gap: 10,
        paddingBottom: 10
    }
})

export default memo(WorkoutList)
