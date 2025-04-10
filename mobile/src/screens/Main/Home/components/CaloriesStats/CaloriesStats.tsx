import GradientButton from '@/src/components/GradientButton'
import Progress from '@/src/components/Progress'
import TextGradient from '@/src/components/TextGradient'
import { targetApi } from '@/src/services/rest'
import { useQuery } from '@tanstack/react-query'
import { StyleSheet, Text, View } from 'react-native'

interface CaloriesStatsProps {
    user_id: string
}

function CaloriesStats({ user_id }: CaloriesStatsProps) {
    const { data } = useQuery({
        queryKey: ['calories', user_id],
        queryFn: () => targetApi.getTargetOfDate({ id: user_id }),
        staleTime: 1000 * 60 * 5
    })

    const target = data?.data?.data
    const burned = target?.calories_burned ?? 0
    const goal = target?.calories_target ?? 1
    const progress = burned / goal
    const left = Math.max(goal - burned, 0)

    return (
        <View style={styles.stats__calories}>
            <Text style={styles.stats__title}>Calories</Text>
            <TextGradient textStyle={styles.stats__value} text={`${burned} kCal`} />
            <View style={styles.calories_chart}>
                <Progress.Circle progress={progress} size={66} />
                <GradientButton rounded containerStyle={styles.calories__btn}>
                    <Text style={styles.calories__btn_text}>{left}kCal left</Text>
                </GradientButton>
            </View>
        </View>
    )
}

export default CaloriesStats

const styles = StyleSheet.create({
    stats__calories: {
        paddingHorizontal: 20,
        paddingTop: 24,
        width: '100%'
    },
    stats__title: {
        fontSize: 12,
        color: '#1D1617',
        fontWeight: '500',
        lineHeight: 18
    },
    stats__value: {
        marginTop: 5,
        fontSize: 14,
        color: '#1D1617',
        fontWeight: '700',
        lineHeight: 21
    },
    calories_chart: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 6
    },
    calories__btn: {
        width: 48,
        position: 'absolute'
    },
    calories__btn_text: {
        textAlign: 'center',
        position: 'absolute',
        width: 36,
        fontSize: 8,
        lineHeight: 12,
        fontWeight: '400',
        color: '#FFF'
    }
})
