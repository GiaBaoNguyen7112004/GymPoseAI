import { SafeAreaView, StyleSheet, View } from 'react-native'
import NavigationBar from '@/components/NavigationBar/NavigationBar'
import LoaderModal from '@/components/LoaderModal'
import NotificationList from './components/NotificationList'
import DynamicBottomSheet from '@/components/DynamicBottomSheet'

import { useResetNotificationCountOnFocus } from '@/hooks/useResetNotificationCount'
import { RootStackScreenProps } from '@/navigation/types'
import useNotifications from '@/hooks/useNotifications'
import useNotificationHandlers from '@/hooks/useNotificationHandlers'

const NotificationScreen = ({ navigation }: RootStackScreenProps<'Notification'>) => {
    useResetNotificationCountOnFocus()

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isFetching, refetch } = useNotifications()

    const { bottomSheetRef, handlePressNotificationCardMore, handlePressNavMore, handleCardNotificationPress } =
        useNotificationHandlers(refetch)

    const notifications = data?.pages.flatMap((page) => page.data) || []

    return (
        <View style={styles.wrapperScreen}>
            {isLoading && <LoaderModal title='Loading' />}
            <SafeAreaView style={styles.navBar}>
                <NavigationBar
                    title='Notifications'
                    callback={navigation.goBack}
                    handleMorePress={handlePressNavMore}
                />
            </SafeAreaView>
            <View style={styles.content}>
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
        backgroundColor: '#FFF'
    },
    navBar: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5'
    },
    content: {
        flex: 1
    }
})
