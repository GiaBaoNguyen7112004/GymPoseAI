import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import YoutubePlayer from 'react-native-youtube-iframe'
import Icon from 'react-native-vector-icons/Feather'
import { RootStackScreenProps } from '@/navigation/types'
import { useQuery } from '@tanstack/react-query'
import GradientButton from '@/components/GradientButton'
import TimeLine from './components/TimeLine'
import { getYouTubeVideoId } from '@/utils/common.util'
import { workoutApi } from '@/services/rest'
import ReadMoreText from '@/components/ReadMoreText'
import useScrollListener from '@/hooks/useScrollListener'
import ExerciseDetailSkeleton from './components/ExerciseDetailSkeleton'

function ExerciseDetail({ navigation, route }: RootStackScreenProps<'ExerciseDetail'>) {
    const { handleScroll, isScrolled } = useScrollListener()
    const { workout_id } = route.params

    const { data, isLoading } = useQuery({
        queryKey: ['workout', workout_id],
        queryFn: () => workoutApi.getWorkoutById({ id: workout_id }),
        staleTime: 1000 * 60 * 10
    })

    const workoutData = data?.data?.data
    const workoutIdYoutube = getYouTubeVideoId(
        workoutData?.media_url || 'https://youtu.be/irfw1gQ0foQ?si=HDvPCvOcnmu9XJ79'
    )

    if (isLoading) return <ExerciseDetailSkeleton />

    return (
        <View style={styles.container}>
            <SafeAreaView style={[styles.navBar, isScrolled && styles.navBarScrolled]}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
                        <Icon name='x' size={18} color='#333' />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                <View style={styles.content}>
                    <View style={styles.videoContainer}>
                        <YoutubePlayer height={300} videoId={workoutIdYoutube as string} />
                    </View>

                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{workoutData?.name || 'Workout'}</Text>
                        <Text style={styles.subtitle}>{workoutData?.duration_minutes || 0} minutes</Text>
                    </View>

                    <View style={styles.descriptionContainer}>
                        <ReadMoreText
                            text={workoutData?.description || 'No description available.'}
                            numberOfLines={4}
                            textStyle={styles.descriptionText}
                            readMoreStyle={styles.readMoreStyle}
                            lineHeight={18}
                        />
                    </View>

                    <View style={styles.howToContainer}>
                        <View style={styles.howToHeader}>
                            <Text style={styles.sectionTitle}>How To Do It</Text>
                            <Text style={styles.stepsCount}>{workoutData?.steps?.length || 0} Steps</Text>
                        </View>
                        <View style={styles.stepsContainer}>
                            <TimeLine stepsData={workoutData?.steps || []} />
                        </View>
                    </View>

                    <GradientButton Square containerStyle={styles.buttonSubmit}>
                        <Text style={styles.textInnerButtonSubmit}>Start</Text>
                    </GradientButton>
                </View>
            </ScrollView>
        </View>
    )
}

export default ExerciseDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    navBar: {
        height: 60,
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: 'transparent'
    },
    navBarScrolled: {
        borderBottomColor: '#E5E5E5'
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
        padding: 20,
        paddingBottom: 40
    },
    videoContainer: {
        borderRadius: 12,
        aspectRatio: 16 / 9,
        marginBottom: 20,
        overflow: 'hidden',
        width: '100%',
        backgroundColor: '#1D1617'
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
    readMoreStyle: {
        fontSize: 12,
        color: '#7B6F72',
        lineHeight: 18,
        fontWeight: '500'
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
