import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import YoutubePlayer from 'react-native-youtube-iframe'
import Icon from 'react-native-vector-icons/Feather'
import { RootStackScreenProps } from '@/src/navigation/types'
import { useQuery } from '@tanstack/react-query'
import GradientButton from '@/src/components/GradientButton'
import TimeLine from './components/TimeLine'
import { getYouTubeVideoId } from '@/src/utils/common.util'
import { workoutApi } from '@/src/services/rest'

function WorkoutDetail({ navigation, route }: RootStackScreenProps<'WorkoutDetail'>) {
    const { workout_id } = route.params

    const { data } = useQuery({
        queryKey: ['workout', workout_id],
        queryFn: () => workoutApi.getWorkoutById({ id: workout_id })
    })

    const workoutData = data?.data?.data
    const workoutIdYoutube = getYouTubeVideoId(
        workoutData?.media_url || 'https://youtu.be/irfw1gQ0foQ?si=HDvPCvOcnmu9XJ79'
    )

    return (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <SafeAreaView style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
                        <Icon name='x' size={18} color='#333' />
                    </TouchableOpacity>
                </View>

                {/* Content */}
                <View style={styles.content}>
                    {/* Video */}
                    <View style={styles.videoContainer}>
                        <YoutubePlayer height={300} videoId={workoutIdYoutube as string} />
                    </View>

                    {/* Title */}
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{workoutData?.name || 'Workout'}</Text>
                        <Text style={styles.subtitle}>{workoutData?.duration_minutes || 0} minutes</Text>
                    </View>

                    {/* Description */}
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.sectionTitle}>Descriptions</Text>
                        <Text style={styles.descriptionText} numberOfLines={5} ellipsizeMode='tail'>
                            {workoutData?.description || 'No description available.'}
                        </Text>
                    </View>

                    {/* Steps */}
                    <View style={styles.howToContainer}>
                        <View style={styles.howToHeader}>
                            <Text style={styles.sectionTitle}>How To Do It</Text>
                            <Text style={styles.stepsCount}>{workoutData?.steps?.length || 0} Steps</Text>
                        </View>
                        <View style={styles.stepsContainer}>
                            <TimeLine stepsData={workoutData?.steps || []} />
                        </View>
                    </View>

                    {/* Start Button */}
                    <GradientButton Square containerStyle={styles.buttonSubmit}>
                        <Text style={styles.textInnerButtonSubmit}>Start</Text>
                    </GradientButton>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

export default WorkoutDetail

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF'
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 10
    },
    closeButton: {
        backgroundColor: '#F7F8F8',
        borderRadius: 8,
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        padding: 20
    },
    videoContainer: {
        borderRadius: 12,
        aspectRatio: 16 / 9,
        marginBottom: 20,
        overflow: 'hidden',
        width: '100%'
    },
    titleContainer: {
        marginBottom: 16
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1D1617',
        textTransform: 'capitalize'
    },
    subtitle: {
        marginTop: 5,
        fontSize: 12,
        fontWeight: '400',
        color: '#7B6F72'
    },
    descriptionContainer: {
        marginBottom: 24
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 15
    },
    descriptionText: {
        fontSize: 12,
        color: '#7B6F72',
        lineHeight: 18,
        fontWeight: '400'
    },
    howToContainer: {
        marginBottom: 24
    },
    howToHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 13
    },
    stepsCount: {
        fontSize: 12,
        fontWeight: '500',
        color: '#ADA4A5'
    },
    stepsContainer: {
        width: '100%'
    },
    buttonSubmit: {
        marginTop: 30,
        shadowColor: 'rgb(146, 163, 253)',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.3,
        shadowRadius: 22,
        elevation: 10
    },
    textInnerButtonSubmit: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFF'
    }
})
