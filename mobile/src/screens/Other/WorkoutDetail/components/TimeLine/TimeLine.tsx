import { StepOfExercise } from '@/types/exercises.type'
import { StyleSheet, Text, View } from 'react-native'
import MyIcon from '@/components/Icon'
import TextGradient from '@/components/TextGradient'
import { COLOR_BRANDS } from '@/constants/common.constants'

interface TimeLineProps {
    stepsData: StepOfExercise[]
}

function TimeLine({ stepsData }: TimeLineProps) {
    const sortedSteps = stepsData.sort((a, b) => a.step_number - b.step_number)
    const handleFormatNumber = (value: number) => value.toString().padStart(2, '0')
    return (
        <View style={styles.stepsContainer}>
            {stepsData.length > 0 &&
                sortedSteps.map((step, index) => (
                    <View key={step.id} style={styles.stepItem}>
                        <View style={[styles.stepNumber]}>
                            <TextGradient
                                text={handleFormatNumber(step.step_number)}
                                colors={COLOR_BRANDS.secondary}
                                style={styles.stepNumberText}
                            />
                            <View style={styles.stepTimeLine}>
                                <MyIcon name='stepDot' size={20} style={styles.dotStep} />
                                {index !== stepsData.length - 1 && (
                                    <MyIcon name='stepLine' height={70} width={20} style={styles.dotLine} />
                                )}
                            </View>
                        </View>
                        <View style={styles.stepContent}>
                            <Text style={styles.stepTitle}>{step.title}</Text>
                            <Text style={styles.stepDescription}>{step.description}</Text>
                        </View>
                    </View>
                ))}
        </View>
    )
}

export default TimeLine

const styles = StyleSheet.create({
    stepsContainer: {
        width: '100%',
        gap: 5
    },
    stepItem: {
        flexDirection: 'row',
        gap: 15
    },
    stepNumber: {
        width: 32,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 9
    },
    stepNumberText: {
        fontSize: 12,
        fontWeight: '400'
    },
    stepTimeLine: {
        flexDirection: 'column',
        alignContent: 'center',
        width: 20,
        height: 95,
        gap: 5,
        position: 'relative'
    },
    dotStep: {},
    dotLine: {},
    stepContent: {
        flex: 1
    },
    stepTitle: {
        fontSize: 14,
        fontWeight: '400',
        marginBottom: 4,
        color: '#1D1617'
    },
    stepDescription: {
        fontSize: 12,
        color: '#7B6F72',
        lineHeight: 18,
        fontWeight: 400
    }
})
