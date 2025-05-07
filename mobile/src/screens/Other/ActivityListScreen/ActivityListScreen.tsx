import React from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavigationBar from '@/components/NavigationBar'
import LoaderModal from '@/components/LoaderModal'
import ActivityItem from '../ActivityTracker/Components/ActivityItem'
import FooterLoader from './components/FooterLoader'
import EmptyComponent from './components/EmptyComponent'
import { useActivityList } from '@/hooks/useActivityList'
import { RootStackScreenProps } from '@/navigation/types'

function ActivityListScreen({ navigation }: RootStackScreenProps<'ActivityList'>) {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useActivityList()

    const activities = data?.pages.flatMap((page) => page.data) || []

    const handleLoadMore = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
        }
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.header}>
                <NavigationBar title='Today Activity' callback={navigation.goBack} />
            </SafeAreaView>
            <View style={{ flex: 1 }}>
                <LoaderModal isVisible={isLoading} />
                <FlatList
                    contentContainerStyle={styles.listContent}
                    data={activities}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <ActivityItem data={item} />}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={isFetchingNextPage ? <FooterLoader /> : null}
                    ListEmptyComponent={!isLoading ? <EmptyComponent /> : null}
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
    header: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 1,
        shadowRadius: 3
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
