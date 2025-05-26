import WorkoutCardSkeleton from '@/components/TrainingSessionCardSkeleton'
import React from 'react'
import { View } from 'react-native'

const LoadingFooter = () => (
    <View style={{ paddingHorizontal: 10, marginBottom: -20 }}>
        <WorkoutCardSkeleton />
    </View>
)

export default LoadingFooter
