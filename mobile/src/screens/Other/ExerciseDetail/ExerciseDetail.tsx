import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import { RootStackScreenProps } from '@/navigation/types'
import { useQuery } from '@tanstack/react-query'
import { getYouTubeVideoId } from '@/utils/common.util'
import { workoutApi } from '@/services/rest'

import GradientButton from '@/components/GradientButton'
import ReadMoreText from '@/components/ReadMoreText'
import ExerciseDetailSkeleton from './components/ExerciseDetailSkeleton'

import ExerciseHeader from './components/ExerciseHeader'
import ExerciseVideoPlayer from './components/ExerciseVideoPlayer'
import ExerciseInfo from './components/ExerciseInfo'
import ExerciseSteps from './components/ExerciseSteps/ExerciseSteps'
import useInteractionReadyState from '@/hooks/useInteractionReadyState'
import { useCallback, useState } from 'react'
import DeviceModal from '@/components/DeviceConnectionModal'
import useBLE from '@/hooks/useBLE'

function ExerciseDetail({ navigation, route }: RootStackScreenProps<'ExerciseDetail'>) {
    const { isReady } = useInteractionReadyState()
    const { workout_id } = route.params
    const { data, isLoading } = useQuery({
        queryKey: ['workout', workout_id],
        queryFn: () => workoutApi.getWorkoutById({ id: workout_id }),
        staleTime: 1000 * 60 * 10
    })

    const workoutData = data?.data?.data
    const workoutIdYoutube = getYouTubeVideoId(workoutData?.media_url || '')

    if (isLoading || !isReady) return <ExerciseDetailSkeleton />

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <ExerciseHeader onClose={navigation.goBack} />
            </SafeAreaView>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <ExerciseVideoPlayer videoId={workoutIdYoutube as string} />

                    <ExerciseInfo name={workoutData?.name || 'Workout'} duration={workoutData?.duration_minutes || 0} />

                    <View style={styles.descriptionContainer}>
                        <ReadMoreText
                            text={workoutData?.description || 'No description available.'}
                            numberOfLines={4}
                            textStyle={styles.descriptionText}
                            readMoreStyle={styles.readMoreStyle}
                            lineHeight={18}
                        />
                    </View>

                    <ExerciseSteps steps={workoutData?.steps || []} />

                    <GradientButton Square containerStyle={styles.buttonSubmit}>
                        <Text style={styles.textInnerButtonSubmit}>Let’s Train</Text>
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
    scrollView: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    content: {
        padding: 20,
        paddingBottom: 40
    },
    descriptionContainer: {
        marginBottom: 24
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
        color: '#FFF',
        textAlign: 'center'
    }
})
