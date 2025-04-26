import { View, StyleSheet, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import NavigationBar from '@/components/NavigationBar'
import { SafeAreaView } from 'react-native-safe-area-context'
import TodayTarget from './Components/TodayTarget'
import ActivityProgress from './Components/ActivityProgress'
import LatestActivity from './Components/LatestActivity'
import { RootStackScreenProps } from '@/navigation/types'
import { useState } from 'react'
import CustomModal from '@/components/CustomModal'
import FormUpdateTodayTarget from './Components/FormUpdateTodayTarget'
import { targetApi } from '@/services/rest'
import { useQuery } from '@tanstack/react-query'

function ActivityTracker({ navigation }: RootStackScreenProps<'ActivityTracker'>) {
    const [modalUpdateTargetVisible, setModalUpdateTargetVisible] = useState<boolean>(false)
    const [showHeaderBorder, setShowHeaderBorder] = useState(false)

    const toggleModalUpdateTarget = () => {
        setModalUpdateTargetVisible((prev) => !prev)
        refetch()
    }

    const { data, refetch } = useQuery({ queryKey: ['today-target'], queryFn: targetApi.getTodayTarget })
    const todayTargetData = data?.data.data

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = event.nativeEvent.contentOffset.y
        setShowHeaderBorder(offsetY > 5) // Khi cuộn xuống 5px thì hiện border
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={[styles.header, showHeaderBorder && styles.headerWithBorder]}>
                <NavigationBar title='Activity Tracker' callback={navigation.goBack} />
            </SafeAreaView>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                <View style={styles.todayTargetCard}>
                    <TodayTarget
                        caloriesVal={todayTargetData?.calories || 0}
                        waterVal={todayTargetData?.water || 0}
                        updateTodayTargetPress={toggleModalUpdateTarget}
                    />
                </View>

                <View style={styles.activityProgressCard}>
                    <ActivityProgress />
                </View>

                <View style={styles.latestActivityCard}>
                    <LatestActivity />
                </View>
            </ScrollView>

            <CustomModal visible={modalUpdateTargetVisible}>
                <FormUpdateTodayTarget
                    caloriesVal={todayTargetData?.calories || 0}
                    waterVal={todayTargetData?.water || 0}
                    onCancel={toggleModalUpdateTarget}
                    onUpdate={toggleModalUpdateTarget}
                />
            </CustomModal>
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
        justifyContent: 'center'
    },
    headerWithBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5'
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 30,
        flexGrow: 1
    },
    todayTargetCard: {
        marginVertical: 30
    },
    activityProgressCard: {
        marginBottom: 30
    },
    latestActivityCard: {
        flex: 1
    }
})

export default ActivityTracker
