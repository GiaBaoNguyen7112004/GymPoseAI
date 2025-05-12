import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import NavigationBar from '@/components/NavigationBar'
import WorkoutSummary from './Components/WorkoutSummary'
import FormFeedBack from './Components/FormFeedBack'
import ImprovementTips from './Components/ImprovementTips'
import LoaderModal from '@/components/LoaderModal'
import { useWorkoutData } from '@/hooks/useWorkoutData'
import { RootStackScreenProps } from '@/navigation/types'
import useScrollListener from '@/hooks/useScrollListener'

function WorkoutSummaryDetail({ navigation, route }: RootStackScreenProps<'WorkoutSummaryDetail'>) {
    const { workout_id } = route.params
    const { workout, poseErrors, workoutDuration, progressData, isLoading } = useWorkoutData(workout_id)

    const { isScrolled, handleScroll } = useScrollListener()

    return (
        <View style={styles.container}>
            <LoaderModal isVisible={isLoading} title='Loading' />
            <SafeAreaView style={[styles.navbar, isScrolled && styles.navbarWithBorder]}>
                <NavigationBar title='Summary' callback={navigation.goBack} />
            </SafeAreaView>
            <ScrollView style={styles.scrollView} onScroll={handleScroll} scrollEventThrottle={16}>
                <View style={styles.section}>
                    <WorkoutSummary
                        workout={workout}
                        workoutDuration={workoutDuration}
                        progressData={progressData}
                        poseErrorCount={poseErrors.length}
                    />
                </View>

                <View style={styles.section}>
                    <FormFeedBack pose_errors={poseErrors} />
                </View>

                <View style={styles.section}>
                    <ImprovementTips />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F8F8'
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#F7F8F8'
    },
    navbar: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F7F8F8'
    },
    navbarWithBorder: {
        borderBottomColor: '#E5E5E5'
    },
    section: {
        marginTop: 20,
        paddingHorizontal: 16
    }
})

export default WorkoutSummaryDetail
