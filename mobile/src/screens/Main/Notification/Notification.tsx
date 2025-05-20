import { SafeAreaView, StyleSheet, View } from 'react-native'
import LoaderModal from '@/components/LoaderModal'
import NotificationList from './components/NotificationList'
import DynamicBottomSheet from '@/components/DynamicBottomSheet'

import { useResetNotificationCountOnFocus } from '@/hooks/useResetNotificationCount'
import { MainTabScreenProps } from '@/navigation/types'
import useNotifications from '@/hooks/useNotifications'
import useNotificationHandlers from '@/hooks/useNotificationHandlers'
import NavigationBarV2 from '@/components/NavigationBarV2'
import { useCallback } from 'react'

const NotificationScreen = ({ navigation }: MainTabScreenProps<'Notification'>) => {
    useResetNotificationCountOnFocus()

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isFetching, refetch } = useNotifications()

    const { bottomSheetRef, handlePressNotificationCardMore, handlePressNavMore, handleCardNotificationPress } =
        useNotificationHandlers(refetch)

    const notifications = data?.pages.flatMap((page) => page.data) || []

    const gotoSearchWorkout = useCallback(() => {
        navigation.navigate('Search')
    }, [])
    return (
        <View style={styles.wrapperScreen}>
            <View style={styles.content}>
                <LoaderModal isVisible={isLoading} />
                <NotificationList
                    gotoSearchWorkout={gotoSearchWorkout}
                    handlePressNavMore={handlePressNavMore}
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
    content: {
        flex: 1
    }
})
