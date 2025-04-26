import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, Pressable } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import MyIcon from '@/components/Icon'
import Progress from '@/components/Progress'
import { workoutHistory } from '@/types/workoutHistory.type'
import { COLOR_BRANDS, ICONS_CATEGORY_MAP } from '@/constants/common.constants'
import AvatarWithIcon from '../AvatarWithIcon'

interface TrainingSessionCardProps {
    item: workoutHistory
    style?: StyleProp<ViewStyle>
    onPress?: () => void
}

function TrainingSessionCard({ item, style, onPress }: TrainingSessionCardProps) {
    const progress = item.calories_burned / item.calories_base
    const colors = item.category == 'lower body' ? COLOR_BRANDS.primary : COLOR_BRANDS.secondary
    const icon = ICONS_CATEGORY_MAP.get(item.category) || 'movement1'
    return (
        <Pressable style={[styles.workoutItem, style]} onPress={onPress}>
            <AvatarWithIcon size={50} colors={colors} icon={icon} />
            <View style={styles.workoutItem__content}>
                <Text style={styles.nameWorkout}>{item.name_workout}</Text>
                <Text style={styles.statsWorkout}>
                    {item.calories_burned} Calories Burned | {item.duration_minutes} minutes
                </Text>
                <Progress.Bar progress={progress} barHeight={191} barWidth={10} style={styles.workoutProgressbar} />
            </View>
            <TouchableOpacity>
                <MyIcon name='arroWRightOutline' size={24} />
            </TouchableOpacity>
        </Pressable>
    )
}

export default TrainingSessionCard

const styles = StyleSheet.create({
    workoutItem: {
        width: '100%',
        padding: 15,
        maxHeight: 80,
        borderRadius: 16,
        backgroundColor: '#fff',
        shadowColor: 'rgba(29, 22, 23, 0.3)',
        shadowOffset: { width: 1, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 20,

        // Android shadow
        elevation: 8,
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,
        alignSelf: 'center'
    },
    workoutItem__content: {
        flex: 1,
        justifyContent: 'flex-start',
        height: 80
    },
    nameWorkout: {
        marginTop: 15,
        fontSize: 12,
        color: '#1D1617',
        fontWeight: '500',
        lineHeight: 18
    },
    statsWorkout: {
        marginTop: 3,
        fontSize: 10,
        color: '#A4A9AD',
        fontWeight: '400',
        lineHeight: 15
    },
    workoutProgressbar: {
        transform: [
            { rotate: '90deg' },
            { translateY: -95 },
            {
                translateX: -80
            }
        ]
    }
})
