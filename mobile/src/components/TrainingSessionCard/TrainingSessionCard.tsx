import { memo, useMemo } from 'react'
import { View, Text, Pressable, StyleSheet, StyleProp, ViewStyle, Image } from 'react-native'
import AvatarWithIcon from '../AvatarWithIcon'
import MyIcon from '@/components/Icon'
import Progress from '@/components/Progress'
import { workoutHistory } from '@/types/workoutHistory.type'
import { COLOR_BRANDS } from '@/constants/common.constants'
import { formatReadableDateTime } from '@/utils/format.util'

interface TrainingSessionCardProps {
    item: workoutHistory
    style?: StyleProp<ViewStyle>
    onPress?: () => void
}

function TrainingSessionCard({ item, style, onPress }: TrainingSessionCardProps) {
    const progress = useMemo(() => {
        return item.elapsed_time ? item.elapsed_time / (item.duration_minutes * 60) : 0
    }, [item.elapsed_time, item.duration_minutes])
    return (
        <Pressable style={[styles.container, style]} onPress={onPress}>
            {item.thumbnail_url ? (
                <View style={styles.avatarContainer}>
                    <Image
                        source={{
                            uri: item.thumbnail_url
                        }}
                        style={styles.avatar}
                        resizeMode='cover'
                    />
                </View>
            ) : (
                <AvatarWithIcon size={50} colors={COLOR_BRANDS.primary} icon='FullBodyWorkout' />
            )}
            <View style={styles.content}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.dateTime}>{formatReadableDateTime(item.start_time)}</Text>
                <Text style={styles.stats}>
                    {item.calories_burned.toFixed(2)} Calories Burned | {item.duration_minutes} minutes
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
        minHeight: 80,
        borderRadius: 16,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,
        alignSelf: 'center',

        // iOS shadow
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,

        // Android shadow
        elevation: 3,

        borderWidth: 0.5,
        borderColor: 'rgba(0, 0, 0, 0.05)'
    },
    content: {
        flex: 1,
        justifyContent: 'flex-start',
        minHeight: 80
    },
    name: {
        fontSize: 14,
        color: '#1D1617',
        fontWeight: '500',
        lineHeight: 18
    },
    dateTime: {
        marginTop: 2,
        fontSize: 11,
        color: '#7B6F72',
        fontWeight: '400',
        lineHeight: 14
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
    },
    avatarContainer: {
        width: 50,
        height: 50,
        borderRadius: 999,
        overflow: 'hidden',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E4E4E7',

        // iOS shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,

        // Android shadow
        elevation: 4
    },
    avatar: {
        width: '100%',
        height: '100%'
    },
    imagePlaceholder: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#F3F4F6',
        borderRadius: 999
    }
})
