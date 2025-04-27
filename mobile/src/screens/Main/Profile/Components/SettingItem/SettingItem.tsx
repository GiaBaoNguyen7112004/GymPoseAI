import { Pressable, Text, StyleSheet, View } from 'react-native'
import { memo, useState } from 'react'
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
    const [isPressed, setIsPressed] = useState(false)

    return (
        <Pressable
            style={({ pressed }) => [
                styles.menuSetting__btn,
                { backgroundColor: pressed ? '#f1f1f1' : 'transparent' } // Thay đổi màu nền khi nhấn
            ]}
            onPressIn={() => setIsPressed(true)} // Khi bắt đầu nhấn
            onPressOut={() => setIsPressed(false)} // Khi nhả ra
            onPress={onPress}
            android_ripple={{ color: '#ddd' }}
        >
            <MyIcon name={icon} size={16} />
            <Text style={styles.setting__label}>{label}</Text>
            {rightComponent || <MyIcon name={rightIcon || 'arrowRightGray'} size={18} />}
        </Pressable>
    )
}

export default memo(SettingItem)

const styles = StyleSheet.create({
    menuSetting__btn: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 5,
        flexShrink: 0,
        borderRadius: 8
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
