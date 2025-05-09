import React, { memo } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import TimeLine from '../TimeLine'
import { StepOfExercise } from '@/types/exercises.type'

type Props = {
    steps: StepOfExercise[]
}

const ExerciseSteps = ({ steps }: Props) => (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>How To Do It</Text>
            <Text style={styles.count}>{steps.length} Steps</Text>
        </View>
        <TimeLine stepsData={steps} />
    </View>
)

export default memo(ExerciseSteps)

const styles = StyleSheet.create({
    container: {
        marginBottom: 24
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 13
    },
    title: {
        fontSize: 16,
        fontWeight: '600'
    },
    count: {
        fontSize: 12,
        fontWeight: '500',
        color: '#ADA4A5'
    }
})
