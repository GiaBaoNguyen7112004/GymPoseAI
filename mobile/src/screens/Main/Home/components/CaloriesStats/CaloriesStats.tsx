import GradientButton from '@/components/GradientButton'
import Progress from '@/components/Progress'
import TextGradient from '@/components/TextGradient'
import { targetApi } from '@/services/rest'
import { useQuery } from '@tanstack/react-query'
import { memo, useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

function CaloriesStats() {
    const { data } = useQuery({
        queryKey: ['calories'],
        queryFn: async () => targetApi.getDailyCaloriesTarget(),
        staleTime: 1000 * 60 * 5
    })

    const { calories_burned = 0, calories_target = 1 } = data?.data?.data ?? {}

    const progress = useMemo(() => calories_burned / calories_target, [calories_burned, calories_target])
    const left = useMemo(() => Math.max(calories_target - calories_burned, 0), [calories_burned, calories_target])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Calories</Text>
            <TextGradient textStyle={styles.value} text={`${calories_burned.toFixed(2)} kCal`} />
            <View style={styles.chartContainer}>
                <Progress.Circle progress={progress} size={66}>
                    <GradientButton rounded containerStyle={styles.button}>
                        <Text style={styles.buttonText}>{left.toFixed(2)} kCal left</Text>
                    </GradientButton>
                </Progress.Circle>
            </View>
        </View>
    )
}

export default memo(CaloriesStats)

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 24
    },
    title: {
        fontSize: 12,
        color: '#1D1617',
        fontWeight: '500',
        lineHeight: 18
    },
    value: {
        fontSize: 14,
        color: '#1D1617',
        fontWeight: '700',
        lineHeight: 21
    },
    chartContainer: {
        marginTop: 6,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    button: {
        width: 48,
        height: 48
    },
    buttonText: {
        position: 'absolute',
        width: 36,
        textAlign: 'center',
        fontSize: 9,
        lineHeight: 12,
        fontWeight: '400',
        color: '#FFF'
    }
})
