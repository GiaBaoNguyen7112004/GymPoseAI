import { ActivityIndicator, ScrollView, StyleSheet, View, Text } from 'react-native'
import { Suspense, useCallback, useState } from 'react'

import LoaderModal from '@/components/LoaderModal'
import DynamicBottomSheet from '@/components/DynamicBottomSheet'
import BlankScreenLoader from '@/components/BlankScreenLoader'
import PoseErrorView from './Components/PoseErrorViewer'
import Header from './Components/Header'
import StatsSection from './Components/StatsSection'
import WorkoutDetailsTable from './Components/WorkoutDetailsTable'
import PoseErrorChart from './Components/PoseErrorChart'
import MoreActionNavBar from './Components/MoreActionNavBar'
import DeleteWorkoutModal from './Components/DeleteWorkoutModal'

import { useWorkoutSummaryData } from '@/hooks/useWorkoutSummaryData'
import useUserData from '@/hooks/useUserData'
import useBottomSheetController from '@/hooks/useBottomSheetController'
import useInteractionReadyState from '@/hooks/useInteractionReadyState'

import { pose_error } from '@/types/workoutHistory.type'
import { RootStackScreenProps } from '@/navigation/types'
import NoDeviceModal from '@/components/NoDeviceModal'
import LottieView from 'lottie-react-native'
import WorkoutSection from './Components/WorkoutSection'
import useRequireDevice from '@/hooks/useRequireDevice'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { workoutHistoryApi } from '@/services/rest'
import showToast from '@/utils/toast.util'

function WorkoutSummaryDetail({ navigation, route }: RootStackScreenProps<'WorkoutSummaryDetail'>) {
    const { userData } = useUserData()
    const { workout_id } = route.params
    const { workoutData, poseErrors, isLoading, progressPercentage, poseErrorsCount, repCount, formAccuracy } =
        useWorkoutSummaryData(workout_id)
    const { isReady } = useInteractionReadyState()
    const { openBottomSheet, closeBottomSheet, bottomSheetRef } = useBottomSheetController()
    const { requireDevice, isModalVisible, handleCloseModal, handleConnectDevice } = useRequireDevice()

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const { mutateAsync: deleteWorkoutSummaryMutateAsync } = useMutation({
        mutationFn: workoutHistoryApi.deleteWorkoutSummaryById
    })
    const queryClient = useQueryClient()

    const handleDeleteConfirm = useCallback(async () => {
        try {
            setIsDeleting(true)
            const body = {
                id: workout_id
            }
            const res = await deleteWorkoutSummaryMutateAsync(body)
            const { message } = res.data
            showToast({ title: message, position: 'top' })

            // Invalidate all related queries to refetch data
            queryClient.invalidateQueries({ queryKey: ['workout-history'] })
            queryClient.invalidateQueries({ queryKey: ['workout-history-screen'] })
            queryClient.invalidateQueries({ queryKey: ['workoutHistory'] })

            setIsDeleteModalVisible(false)
            navigation.goBack()
        } catch (error) {
            showToast({ title: 'Failed to delete workout summary', position: 'top' })
        } finally {
            setIsDeleting(false)
            setIsDeleteModalVisible(false)
        }
    }, [deleteWorkoutSummaryMutateAsync, navigation, queryClient, workout_id])

    const handleDeleteCancel = useCallback(() => {
        setIsDeleteModalVisible(false)
    }, [])

    const handleResumeWorkoutPress = useCallback(() => {
        closeBottomSheet()
        requireDevice(() => {
            navigation.navigate('GymLiveScreen', {
                workout_history_id: workout_id
            })
        })
    }, [closeBottomSheet, navigation, workout_id])

    const handlePoseErrorPress = useCallback(
        (item: pose_error) => {
            openBottomSheet(
                <Suspense fallback={<ActivityIndicator />}>
                    <PoseErrorView poseError={item} />
                </Suspense>
            )
        },
        [openBottomSheet]
    )

    const handleMorePress = useCallback(() => {
        openBottomSheet(
            <Suspense fallback={<ActivityIndicator />}>
                <MoreActionNavBar
                    handleDeleteWorkout={() => setIsDeleteModalVisible(true)}
                    handleResumeWorkout={handleResumeWorkoutPress}
                    isCompleteWorkout={progressPercentage >= 99.9}
                />
            </Suspense>
        )
    }, [openBottomSheet, handleResumeWorkoutPress, progressPercentage])

    if (!isReady) return <BlankScreenLoader />

    return (
        <View style={styles.container}>
            <LoaderModal isVisible={isLoading} title='Loading' />

            <Header
                headerTitle={workoutData?.name ?? '_ _'}
                handleBack={navigation.goBack}
                handleMorePress={handleMorePress}
            />

            <ScrollView style={styles.scrollView} scrollEventThrottle={16}>
                <WorkoutSection
                    userData={userData}
                    startTime={workoutData?.start_time ?? '_ _'}
                    progress={progressPercentage}
                />

                <StatsSection
                    elapsedTime={workoutData?.elapsed_time ?? 0}
                    durationMinutes={workoutData?.duration_minutes ?? 0}
                    repCount={repCount}
                    formAccuracy={formAccuracy}
                    poseErrorsCount={poseErrorsCount}
                    caloriesBurned={workoutData?.calories_burned ?? 0}
                />
                {poseErrorsCount > 0 ? (
                    <>
                        <PoseErrorChart poseErrors={poseErrors} />
                        <WorkoutDetailsTable poseErrors={poseErrors} handlePoseErrorPress={handlePoseErrorPress} />
                    </>
                ) : (
                    <View style={styles.congratsContainer}>
                        <LottieView
                            source={require('@/assets/animations/workout_summary_conguration.json')}
                            autoPlay
                            loop
                            style={styles.banner}
                        />
                        <Text style={styles.congratsTitle}>
                            {userData?.first_name ? `Great job, ${userData.first_name}!` : 'Great job!'}
                        </Text>
                        <Text style={styles.congratsMessage}>
                            You nailed your {workoutData?.name || 'workout'} with perfect form! No pose errors detected.
                            Keep up the amazing work!
                        </Text>
                    </View>
                )}
            </ScrollView>

            <DynamicBottomSheet ref={bottomSheetRef} enableDynamicSizing />
            <NoDeviceModal
                isVisible={isModalVisible}
                onClose={handleCloseModal}
                onConnectDevice={handleConnectDevice}
            />
            <DeleteWorkoutModal
                isVisible={isDeleteModalVisible}
                onClose={handleDeleteCancel}
                onDelete={handleDeleteConfirm}
                isDeleting={isDeleting}
            />
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
    banner: {
        width: 375,
        height: 350,
        flexShrink: 0
    },
    congratsContainer: {
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 20
    },
    congratsTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
        marginTop: 10,
        textAlign: 'center'
    },
    congratsMessage: {
        fontSize: 14,
        color: '#4B5563',
        textAlign: 'center',
        marginTop: 8,
        lineHeight: 20,
        paddingHorizontal: 16
    }
})

export default WorkoutSummaryDetail
