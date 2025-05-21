import { View, Text, StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native'
import { RootStackScreenProps } from '@/navigation/types'

import GradientButton from '@/components/GradientButton'
import ReadMoreText from '@/components/ReadMoreText'
import ExerciseDetailSkeleton from './components/ExerciseDetailSkeleton'
import ExerciseHeader from './components/ExerciseHeader'
import ExerciseVideoPlayer from './components/ExerciseVideoPlayer'
import ExerciseInfo from './components/ExerciseInfo'
import ExerciseSteps from './components/ExerciseSteps/ExerciseSteps'
import useInteractionReadyState from '@/hooks/useInteractionReadyState'
import { useCallback } from 'react'
import NoDeviceModal from '@/components/NoDeviceModal'
import useExerciseData from '@/hooks/useExcersieData'
import BlankScreenLoader from '@/components/BlankScreenLoader'
import useRequireDevice from '@/hooks/useRequireDevice'
import { useFocusEffect } from '@react-navigation/native'

function ExerciseDetail({ navigation, route }: RootStackScreenProps<'ExerciseDetail'>) {
    const { isReady } = useInteractionReadyState()
    const { exercise_id } = route.params
    const { workoutData, isLoading, workoutIdYoutube } = useExerciseData({ exercise_id })

    const { requireDevice, isModalVisible, handleCloseModal, handleConnectDevice } = useRequireDevice()

    const handleLetTrainPress = useCallback(() => {
        requireDevice(() => {
            navigation.navigate('GymLiveScreen', {
                exercise_id: exercise_id
            })
        })
    }, [requireDevice, exercise_id])

    useFocusEffect(
        useCallback(() => {
            if (!workoutData?.is_training_supported) {
                Alert.alert('Training Unavailable', 'This workout does not support training mode.', [{ text: 'OK' }])
            }
        }, [workoutData?.is_training_supported, handleConnectDevice])
    )

    if (!isReady) return <BlankScreenLoader />
    if (isLoading) return <ExerciseDetailSkeleton />

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

                    <GradientButton
                        Square
                        containerStyle={styles.buttonSubmit}
                        disabled={!workoutData?.is_training_supported}
                        onPress={handleLetTrainPress}
                    >
                        <Text style={styles.textInnerButtonSubmit}>Let’s Train</Text>
                    </GradientButton>
                </View>

                <NoDeviceModal
                    isVisible={isModalVisible}
                    onClose={handleCloseModal}
                    onConnectDevice={handleConnectDevice}
                />
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
