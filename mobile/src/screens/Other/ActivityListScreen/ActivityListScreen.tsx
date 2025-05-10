import React, { useCallback } from 'react'
import { StyleSheet, View, FlatList, ListRenderItemInfo } from 'react-native'
import LoaderModal from '@/components/LoaderModal'
import ActivityItem from '../ActivityTracker/Components/ActivityItem'
import FooterLoader from './components/FooterLoader'
import { useActivityList } from '@/hooks/useActivityList'
import { RootStackScreenProps } from '@/navigation/types'
import { UserActivity } from '@/types/userActivity.type'
import Header from './components/Header'
import EmptyComponent from '@/components/EmptyComponent'

function ActivityListScreen({ navigation }: RootStackScreenProps<'ActivityList'>) {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useActivityList()

    const activities = data?.pages.flatMap((page) => page.data) || []

    const handleLoadMore = useCallback(() => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
        }
    }, [])
    const renderItem = useCallback(({ item }: ListRenderItemInfo<UserActivity>) => {
        return <ActivityItem data={item} />
    }, [])
    const keyExtractor = useCallback((item: UserActivity) => item.id.toString(), [])

    return (
        <View style={styles.container}>
            <Header goBackScreen={navigation.goBack} />
            <View style={styles.content}>
                <LoaderModal isVisible={isLoading} />
                <FlatList
                    contentContainerStyle={styles.listContent}
                    data={activities}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={isFetchingNextPage ? <FooterLoader /> : null}
                    ListEmptyComponent={<EmptyComponent />}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    content: {
        flex: 1
    },
    listContent: {
        padding: 15,
        paddingBottom: 30,
        flexGrow: 1,
        backgroundColor: '#F7F8F8',
        gap: 10
    }
})

export default ActivityListScreen
