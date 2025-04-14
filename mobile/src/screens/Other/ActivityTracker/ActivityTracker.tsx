import { View, StyleSheet, ScrollView } from 'react-native'
import NavigationBar from '@/src/components/NavigationBar'
import { SafeAreaView } from 'react-native-safe-area-context'
import TodayTarget from './Components/TodayTarget'
import ActivityProgress from './Components/ActivityProgress'
import LatestActivity from './Components/LatestActivity'
import { RootStackScreenProps } from '@/src/navigation/types'
import { useState } from 'react'
import CustomModal from '@/src/components/CustomModal'
import FormUpdateTodayTarget from './Components/FormUpdateTodayTarget'
import { targetApi } from '@/src/services/rest'
import { useQuery } from '@tanstack/react-query'

function ActivityTracker({ navigation }: RootStackScreenProps<'ActivityTracker'>) {
    const [modalUpdateTargetVisible, setModalUpdateTargetVisible] = useState<boolean>(false)
    const toggleModalUpdateTarget = () => {
        setModalUpdateTargetVisible((prev) => !prev)
        refetch()
    }

    const { data, refetch } = useQuery({ queryKey: ['today-target'], queryFn: targetApi.getTodayTarget })
    const todayTargetData = data?.data.data

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.header}>
                <NavigationBar title='Activity Tracker' callback={navigation.goBack} />
            </SafeAreaView>

            <View style={styles.content}>
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
            </View>

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
    content: {
        paddingHorizontal: 20,
        flex: 1
    },
    header: {
        height: 85
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700'
    },
    todayTargetCard: {
        marginVertical: 30
    },
    activityProgressCard: {
        marginBottom: 30
    },
    activityProgressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 18
    },
    latestActivityCard: {
        flex: 1
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: '#F194FF'
    },
    buttonClose: {
        backgroundColor: '#2196F3'
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center'
    }
})

export default ActivityTracker
