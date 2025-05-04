import AvatarWithIcon from '@/components/AvatarWithIcon'
import { COLOR_BRANDS } from '@/constants/common.constants'
import { UserActivity } from '@/types/userActivity.type'
import { formatRelativeTimeFromNow } from '@/utils/format.util'
import { Feather } from '@expo/vector-icons'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface ActivityItemProps {
    data: UserActivity
}
function ActivityItem({ data }: ActivityItemProps) {
    const iconActivity = data.activity == 'drinking' ? 'humanDrinking' : 'FullBodyWorkout'
    return (
        <View style={styles.activityItem}>
            <AvatarWithIcon size={55} colors={COLOR_BRANDS.secondary} icon={iconActivity} />
            <View style={styles.activityDetails}>
                <Text style={styles.activityTitle}>{data.name}</Text>
                <Text style={styles.activityTime}>{formatRelativeTimeFromNow(data.time)}</Text>
            </View>
            <TouchableOpacity>
                <Feather name='more-horizontal' size={20} color='#000' />
            </TouchableOpacity>
        </View>
    )
}

export default ActivityItem

const styles = StyleSheet.create({
    activityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 16
    },
    activityIconContainer: {},
    activityDetails: {
        flex: 1,
        marginLeft: 8
    },
    activityTitle: {
        fontSize: 15,
        fontWeight: '500',
        color: '#1D1617',
        lineHeight: 18
    },
    activityTime: {
        fontSize: 11,
        color: '#A4A9AD',
        lineHeight: 15,
        fontWeight: '400',
        marginTop: 3
    }
})
