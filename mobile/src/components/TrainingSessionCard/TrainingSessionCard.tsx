import { memo, useMemo } from 'react'
import { View, Text, Pressable, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import AvatarWithIcon from '../AvatarWithIcon'
import MyIcon from '@/components/Icon'
import Progress from '@/components/Progress'
import { categories, workoutHistory } from '@/types/workoutHistory.type'
import { COLOR_BRANDS, ICONS_CATEGORY_MAP } from '@/constants/common.constants'

interface TrainingSessionCardProps {
    item: workoutHistory
    style?: StyleProp<ViewStyle>
    onPress?: () => void
}

function TrainingSessionCard({ item, style, onPress }: TrainingSessionCardProps) {
    const progress = useMemo(() => {
        return item.calories_burned / item.calories_base
    }, [item.calories_burned, item.calories_base])

    const colors = useMemo(() => {
        return item.category === 'lower body' ? COLOR_BRANDS.primary : COLOR_BRANDS.secondary
    }, [item.category])

    const icon = useMemo(() => {
        return ICONS_CATEGORY_MAP.get(item.category as categories) || 'movement1'
    }, [item.category])

    return (
        <Pressable style={[styles.container, style]} onPress={onPress}>
            <AvatarWithIcon size={50} colors={colors} icon={icon} />
            <View style={styles.content}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.stats}>
                    {item.calories_burned} Calories Burned | {item.duration_minutes} minutes
                </Text>
                <Progress.Bar
                    progress={progress}
                    barHeight={191}
                    barWidth={10}
                    style={styles.progressBar}
                    orientation='horizontal'
                />
            </View>
            <MyIcon name='arroWRightOutline' size={24} />
        </Pressable>
    )
}

export default memo(TrainingSessionCard)

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 15,
        maxHeight: 80,
        borderRadius: 16,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,
        alignSelf: 'center',
        // iOS shadow
        shadowColor: 'rgba(29, 22, 23, 0.1)',
        shadowOffset: { width: 1, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 20,
        // Android shadow
        elevation: 10,
        borderWidth: 0.5,
        borderColor: 'rgba(0, 0, 0, 0.1)'
    },
    content: {
        flex: 1,
        justifyContent: 'flex-start',
        height: 80
    },
    name: {
        marginTop: 15,
        fontSize: 14,
        color: '#1D1617',
        fontWeight: '500',
        lineHeight: 18
    },
    stats: {
        marginTop: 3,
        fontSize: 12,
        color: '#A4A9AD',
        fontWeight: '400',
        lineHeight: 15
    },
    progressBar: {
        marginTop: 10,
        width: '100%',
        height: 10,
        borderRadius: 5
    }
})
