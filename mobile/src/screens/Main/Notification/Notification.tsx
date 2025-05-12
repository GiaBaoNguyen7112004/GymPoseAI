import { SafeAreaView, StyleSheet, View } from 'react-native'
import NavigationBar from '@/components/NavigationBar/NavigationBar'
import LoaderModal from '@/components/LoaderModal'
import NotificationList from './components/NotificationList'
import DynamicBottomSheet from '@/components/DynamicBottomSheet'

import { useResetNotificationCountOnFocus } from '@/hooks/useResetNotificationCount'
import { MainTabScreenProps } from '@/navigation/types'
import useNotifications from '@/hooks/useNotifications'
import useNotificationHandlers from '@/hooks/useNotificationHandlers'

const NotificationScreen = ({ navigation }: MainTabScreenProps<'Notification'>) => {
    useResetNotificationCountOnFocus()

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isFetching, refetch } = useNotifications()

    const { bottomSheetRef, handlePressNotificationCardMore, handlePressNavMore, handleCardNotificationPress } =
        useNotificationHandlers(refetch)

    const notifications = data?.pages.flatMap((page) => page.data) || []

    return (
        <View style={styles.wrapperScreen}>
            <SafeAreaView style={styles.navBar}>
                <NavigationBar
                    title='Notifications'
                    callback={navigation.goBack}
                    handleMorePress={handlePressNavMore}
                />
            </SafeAreaView>
            <View style={styles.content}>
                <LoaderModal isVisible={isLoading} />
                <NotificationList
                    notifications={notifications}
                    onRefresh={refetch}
                    isFetching={isFetching}
                    isFetchingNextPage={isFetchingNextPage}
                    fetchNextPage={fetchNextPage}
                    hasNextPage={hasNextPage}
                    onCardPress={(item) => handleCardNotificationPress(item, navigation)}
                    onMorePress={handlePressNotificationCardMore}
                />
            </View>
            <DynamicBottomSheet ref={bottomSheetRef} enableDynamicSizing />
        </View>
    )
}

export default NotificationScreen

const styles = StyleSheet.create({
    wrapperScreen: {
        flex: 1,
        backgroundColor: '#F7F8F8'
    },
    navBar: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        backgroundColor: '#FFF',
        // iOS shadow
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.1,
        shadowRadius: 3
    },
    content: {
        flex: 1
    }
})
