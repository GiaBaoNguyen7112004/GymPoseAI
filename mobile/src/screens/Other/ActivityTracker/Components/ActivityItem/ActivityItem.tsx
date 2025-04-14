import AvatarWithIcon from '@/src/components/AvatarWithIcon'
import { COLOR_BRANDS } from '@/src/constants/common.constants'
import { UserActivity } from '@/src/types/userActivity.type'
import { formatRelativeTimeFromNow } from '@/src/utils/format.util'
import { Feather } from '@expo/vector-icons'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface ActivityItemProps {
    data: UserActivity
}
function ActivityItem({ data }: ActivityItemProps) {
    const iconActivity = data.activity == 'drinking' ? 'humanDrinking' : 'FullBodyWorkout'
    return (
        <View style={styles.activityItem}>
            <AvatarWithIcon size={50} colors={COLOR_BRANDS.secondary} icon={iconActivity} />
            <View style={styles.activityDetails}>
                <Text style={styles.activityTitle}>{data.name}</Text>
                <Text style={styles.activityTime}>{formatRelativeTimeFromNow(data.time)}</Text>
            </View>
            <TouchableOpacity>
                <Feather name='more-vertical' size={20} color='#9CA3AF' />
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
    activityIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    activityDetails: {
        flex: 1,
        marginLeft: 8
    },
    activityTitle: {
        fontSize: 12,
        fontWeight: '500',
        color: '#1D1617',
        lineHeight: 18
    },
    activityTime: {
        fontSize: 10,
        color: '#A4A9AD',
        lineHeight: 15,
        fontWeight: '400',
        marginTop: 3
    }
})
