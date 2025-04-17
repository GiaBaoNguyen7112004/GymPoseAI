import GradientButton from '@/components/GradientButton'
import MyIcon from '@/components/Icon'
import { SCREEN_WIDTH } from '@/constants/devices.constant'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useContext } from 'react'
import TrainingSessionCard from '@/components/TrainingSessionCard'
import { useQuery } from '@tanstack/react-query'
import { AppContext } from '@/Contexts/App.context'
import WaterIntake from './components/WaterIntake/WaterIntake'
import BMIStats from './components/BMI'
import WorkoutProgressChart from './components/WorkoutProgress'
import CaloriesStats from './components/CaloriesStats'
import { workoutHistoryApi } from '@/services/rest'
import { MainTabScreenProps } from '@/navigation/types'

function Home({ navigation }: MainTabScreenProps<'Home'>) {
    const { profile } = useContext(AppContext)

    const { data: workoutHistoryResp } = useQuery({
        queryKey: ['workout-history'],
        queryFn: () =>
            workoutHistoryApi.getWorkoutHistory({
                params: { page: 1, limit: 3, sort_by: 'createAt' },
                user_id: profile?.id || ''
            })
    })

    const workoutHistoryData = workoutHistoryResp?.data.data

    const handleNotificationClick = () => {
        navigation.navigate('Notification')
    }
    const handleSeeMoreWorkoutHistory = () => {
        navigation.navigate('WorkoutHistoryCenter')
    }
    const handleWorkoutCardClick = (workoutId: string) => {
        navigation.navigate('WorkoutHistoryDetail', { workout_id: workoutId })
    }
    const handleCheckTodayTarget = () => {
        navigation.navigate('ActivityTracker')
    }
    return (
        <ScrollView style={styles.safeArea} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.headerText}>Welcome Back,</Text>
                        <Text style={styles.headerHeading} numberOfLines={1} ellipsizeMode='tail'>
                            {profile?.first_name + ' ' + profile?.last_name}
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.headerButton} onPress={handleNotificationClick}>
                        <MyIcon name='notificationIcon' size={18} />
                    </TouchableOpacity>
                </View>

                <View style={styles.bmiWrapper}>
                    {/* BMI Stats */}
                    <BMIStats />
                </View>
                <View style={styles.scheduleWrapper}>
                    <View style={styles.ScheduleAction}>
                        <Text style={styles.scheduleAction__title}>Today Target</Text>
                        <GradientButton Square style={styles.schedule__btn} onPress={handleCheckTodayTarget}>
                            <Text style={styles.schedule__btn_text}>Check</Text>
                        </GradientButton>
                    </View>
                </View>
                <View style={styles.activityWrapper}>
                    <View style={styles.activityStatus}>
                        <Text style={styles.title}>Activity Status</Text>
                        <View style={styles.stats}>
                            <View style={styles.stats__BoxLeft}>
                                {/* Water Intake bar */}
                                <WaterIntake />
                            </View>
                            <View style={styles.stats__boxRight}>
                                <View
                                    style={[
                                        styles.stats__squareBox,
                                        {
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }
                                    ]}
                                >
                                    <MyIcon name='sleepGraph' width={'100%'} size={110} />
                                </View>
                                <View style={styles.stats__squareBox}>
                                    <CaloriesStats user_id={profile?.id || ''} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.workoutProgressWrapper}>
                    {/* workout chart */}
                    <WorkoutProgressChart user_id={profile?.id || ''} />
                </View>
                <View style={styles.workoutHistoryWrapper}>
                    <View style={styles.workoutProgressHeader}>
                        <Text style={styles.title}>Latest Workout</Text>
                        <TouchableOpacity onPress={handleSeeMoreWorkoutHistory}>
                            <Text style={styles.subtitle_gray}>See more</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.workoutList}>
                        {workoutHistoryData &&
                            workoutHistoryData.length > 0 &&
                            workoutHistoryData.map((workout) => (
                                <TrainingSessionCard
                                    item={workout}
                                    style={styles.workoutItem}
                                    key={workout.id}
                                    onPress={() => handleWorkoutCardClick(workout.id)}
                                />
                            ))}
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

export default Home

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    container: {
        backgroundColor: '#FFF',
        alignItems: 'center',
        alignSelf: 'center',
        width: SCREEN_WIDTH
    },
    title: {
        fontSize: 16,
        color: '#1D1617',
        fontWeight: '600',
        lineHeight: 24
    },
    subtitle_gray: {
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 18,
        color: '#ADA4A5'
    },

    header: {
        marginTop: 20,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerText: {
        color: '#ADA4A5',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 18
    },
    headerHeading: {
        color: '#1D1617',
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 30,
        width: '90%'
    },
    headerButton: {
        width: 40,
        height: 40,
        backgroundColor: '#F7F8F8',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bmiWrapper: {
        width: '90%',
        marginTop: 30,
        height: 146
    },
    scheduleWrapper: {
        marginTop: 38,
        width: '90%'
    },
    ScheduleAction: {
        width: '100%',
        height: 57,
        borderRadius: 16,
        backgroundColor: '#EAF0FF',
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    schedule__btn: {
        width: 68,
        height: 28
    },
    schedule__btn_text: {
        fontSize: 12,
        fontWeight: '400',
        color: '#fff',
        position: 'absolute'
    },
    scheduleAction__title: {
        fontSize: 14,
        color: '#1D1617',
        fontWeight: '500'
    },
    activityWrapper: {
        marginTop: 30,
        width: '90%'
    },
    activityStatus: {
        width: '100%'
    },
    stats: {
        marginTop: 16,
        flexDirection: 'row',
        columnGap: 15
    },
    stats__BoxLeft: {
        flex: 1
    },
    stats__boxRight: {
        flex: 1,
        rowGap: 15
    },
    stats__squareBox: {
        width: '100%',
        flex: 1,
        borderRadius: 20,
        backgroundColor: '#fff',
        shadowColor: 'rgba(29, 36, 42, 0.05)',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 40,
        elevation: 10
    },
    workoutProgressWrapper: {
        marginTop: 33,
        width: '90%'
    },
    workoutProgressHeader: {
        marginTop: 33,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    workoutHistoryWrapper: {
        alignItems: 'center',
        width: '100%'
    },
    workoutList: {
        marginTop: 20,
        rowGap: 15,
        alignContent: 'center',
        justifyContent: 'center',
        width: SCREEN_WIDTH
    },
    workoutItem: {
        width: SCREEN_WIDTH * 0.9,
        height: 80
    }
})
