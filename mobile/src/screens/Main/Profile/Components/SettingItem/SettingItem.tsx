import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import MyIcon from '@/components/Icon'
import { IconName } from '@/constants/icon.constants'

interface SettingItemProps {
    icon: IconName
    label: string
    onPress?: () => void
    rightIcon?: IconName
    rightComponent?: React.ReactNode
}

function SettingItem({ icon, label, onPress, rightIcon, rightComponent }: SettingItemProps) {
    return (
        <TouchableOpacity style={styles.menuSetting__btn} onPress={onPress}>
            <MyIcon name={icon} size={16} />
            <Text style={styles.setting__label}>{label}</Text>
            {rightComponent || <MyIcon name={rightIcon || 'arrowRightGray'} size={18} />}
        </TouchableOpacity>
    )
}

export default SettingItem

const styles = StyleSheet.create({
    menuSetting__btn: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 5,
        flexShrink: 0
    },
    setting__label: {
        flex: 1,
        fontSize: 14,
        lineHeight: 21,
        fontWeight: '400',
        color: '#7B6F72',
        marginLeft: 10
    }
})
