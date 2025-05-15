import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import { RootStackScreenProps } from '@/navigation/types'

import GradientButton from '@/components/GradientButton'
import ReadMoreText from '@/components/ReadMoreText'
import ExerciseDetailSkeleton from './components/ExerciseDetailSkeleton'

import ExerciseHeader from './components/ExerciseHeader'
import ExerciseVideoPlayer from './components/ExerciseVideoPlayer'
import ExerciseInfo from './components/ExerciseInfo'
import ExerciseSteps from './components/ExerciseSteps/ExerciseSteps'
import useInteractionReadyState from '@/hooks/useInteractionReadyState'
import { useCallback, useState } from 'react'
import NoDeviceModal from '@/components/NoDeviceModal'
import useBluetoothContext from '@/hooks/useBluetoothContext'
import useExerciseData from '@/hooks/useExcersieData'

function ExerciseDetail({ navigation, route }: RootStackScreenProps<'ExerciseDetail'>) {
    const { connectedDevice, peripheralInfo } = useBluetoothContext()
    const [isModalVisible, setModalVisible] = useState(false)
    const { isReady } = useInteractionReadyState()
    const { exercise_id } = route.params
    const { workoutData, isLoading, workoutIdYoutube } = useExerciseData({ exercise_id })
    const handleLetTrainPress = useCallback(() => {
        // if (!peripheralInfo?.id || !connectedDevice) {
        //     setModalVisible(true)
        //     return
        // }
        navigation.navigate('GymLiveScreen', {
            exercise_id: exercise_id
        })
    }, [peripheralInfo?.id, connectedDevice])

    const handleCloseModal = useCallback(() => {
        setModalVisible(false)
    }, [])
    const handleConnectDevice = useCallback(() => {
        setModalVisible(false)
        //peripheralInfo?.id
        const isHasDevice = Boolean(true)
        if (isHasDevice) {
            navigation.navigate('MyDevice')
        } else navigation.navigate('BlueToothScan')
    }, [peripheralInfo?.id])

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

                    <GradientButton Square containerStyle={styles.buttonSubmit} onPress={handleLetTrainPress}>
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
