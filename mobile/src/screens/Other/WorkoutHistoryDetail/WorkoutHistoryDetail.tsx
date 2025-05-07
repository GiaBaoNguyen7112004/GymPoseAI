import { SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

import NavigationBar from '@/components/NavigationBar'
import TextGradient from '@/components/TextGradient'
import AvatarWithIcon from '@/components/AvatarWithIcon'
import WorkoutHistoryProgressChart from './Components/WorkoutHistoryProgressChart'
import FormFeedBack from './Components/FormFeedBack'
import ActivityItem from './Components/ActivityItem'
import StatItem from './Components/StatItem'

import { COLOR_BRANDS } from '@/constants/common.constants'
import { RootStackScreenProps } from '@/navigation/types'
import { formatDate } from '@/utils/format.util'
import useScrollListener from '@/hooks/useScrollListener'
import LoaderModal from '@/components/LoaderModal'
import { useWorkoutData } from '@/hooks/useWorkoutData'

export default function WorkoutHistoryDetail({ navigation, route }: RootStackScreenProps<'WorkoutHistoryDetail'>) {
    const { workout_id } = route.params

    const { workout, poseErrors, workoutDuration, progressData, isLoading } = useWorkoutData(workout_id)

    const { isScrolled, handleScroll } = useScrollListener()

    return (
        <View style={styles.container}>
            <LoaderModal isVisible={isLoading} />
            <SafeAreaView style={[styles.navbar, isScrolled && styles.navbarWithBorder]}>
                <NavigationBar title='Summary' callback={navigation.goBack} />
            </SafeAreaView>
            <ScrollView style={styles.scrollView} onScroll={handleScroll} scrollEventThrottle={16}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Workout Summary</Text>

                    <View style={styles.cardTop}>
                        <View style={styles.header}>
                            <AvatarWithIcon size={40} colors={COLOR_BRANDS.secondary} icon='AbWorkout' />
                            <View>
                                <Text style={styles.name}>{workout?.name_workout}</Text>
                                <Text style={styles.date}>{formatDate(new Date(workout?.start_time || ''))}</Text>
                            </View>
                        </View>

                        <View style={styles.activityRow}>
                            <View>
                                <ActivityItem
                                    label='Calories Burned'
                                    value={`${workout?.calories_burned || 0}`}
                                    unit={`/ ${workout?.calories_base || 0} CAL`}
                                    color={(progressData as any).colors?.[1]}
                                />
                                <ActivityItem
                                    label='Exercise Time'
                                    value={`${workoutDuration || 0}`}
                                    unit={`/ ${workout?.duration_minutes || 0} MIN`}
                                    color={(progressData as any).colors[0]}
                                />
                                <ActivityItem
                                    label='Form Accuracy'
                                    value={(progressData as any).data[2].toFixed(2).toString()}
                                    unit='%'
                                    color={(progressData as any).colors[2]}
                                />
                            </View>

                            <View style={styles.chartWrapper}>
                                <WorkoutHistoryProgressChart data={progressData} />
                            </View>
                        </View>
                    </View>

                    <View style={styles.cardBottom}>
                        <StatItem label='Total Reps' value={workout?.reps_count || 0} />
                        <StatItem label='Form Errors' value={poseErrors.length || 0} />
                    </View>
                </View>

                <View style={styles.section}>
                    <FormFeedBack pose_errors={poseErrors} />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Improvement Tips</Text>
                    <View style={styles.card}>
                        <View style={styles.tipContent}>
                            <View style={styles.tipIcon}>
                                <FontAwesome5 name='dumbbell' size={20} color='#92A3FD' />
                            </View>
                            <View style={[styles.tipLine, { backgroundColor: '#9DCEFF' }]} />
                            <Text style={styles.tipText}>
                                Push yourself, because no one else is going to do it for you.
                            </Text>
                            <TouchableOpacity>
                                <TextGradient text='Get Started' style={styles.getStartedText} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const card = {
    backgroundColor: '#fff',
    shadowColor: 'rgba(29, 22, 23, 0.1)',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 8
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F7F8F8' },
    scrollView: { flex: 1, backgroundColor: '#F7F8F8' },
    navbar: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F7F8F8',
        borderBottomWidth: 1,
        borderBottomColor: 'transparent'
    },
    navbarWithBorder: {
        borderBottomColor: '#E5E5E5'
    },
    section: { marginTop: 20, paddingHorizontal: 16 },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1D1617',
        marginBottom: 5
    },
    cardTop: {
        ...card,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 20
    },
    header: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
        marginBottom: 15
    },
    name: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1D1617'
    },
    date: {
        marginTop: 5,
        fontSize: 10,
        fontWeight: '400',
        color: '#7B6F72'
    },
    activityRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    chartWrapper: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardBottom: {
        ...card,
        marginTop: 3,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    card: {
        ...card,
        borderRadius: 12,
        padding: 16,
        marginBottom: 20
    },
    tipContent: { alignItems: 'center' },
    tipIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    tipLine: {
        width: 40,
        height: 2,
        marginBottom: 15
    },
    tipText: {
        fontSize: 13,
        color: '#7B6F72',
        textAlign: 'center',
        marginBottom: 15,
        lineHeight: 22
    },
    getStartedText: {
        fontSize: 16,
        fontWeight: '500'
    }
})
