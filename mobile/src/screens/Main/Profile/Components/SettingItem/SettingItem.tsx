import { Pressable, Text, StyleSheet, View } from 'react-native'
import { memo, useCallback } from 'react'
import MyIcon from '@/components/Icon'
import { IconName } from '@/constants/icon.constants'

interface SettingItemProps {
    icon?: IconName
    label: string
    subText?: string
    onPress?: () => void
    rightIcon?: IconName
    rightComponent?: React.ReactNode
    noBorderBottom?: boolean
}

const SettingItem = ({
    noBorderBottom,
    subText,
    icon,
    label,
    onPress,
    rightIcon,
    rightComponent
}: SettingItemProps) => {
    const handlePress = useCallback(() => {
        if (onPress) {
            onPress()
        }
    }, [onPress])

    return (
        <Pressable
            style={({ pressed }) => [
                styles.menuSetting__btn,
                { backgroundColor: pressed ? '#f1f1f1' : 'transparent' },
                noBorderBottom && { borderBottomWidth: 0 }
            ]}
            onPress={handlePress}
            android_ripple={{ color: '#ddd' }}
        >
            {icon && <MyIcon name={icon} size={16} />}
            <View style={styles.textWrapper}>
                <Text style={styles.setting__label}>{label}</Text>
                {subText && <Text style={styles.subText}>{subText}</Text>}
            </View>

            {rightComponent || <MyIcon name={rightIcon || 'arrowRightGray'} size={18} />}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    menuSetting__btn: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 20,
        flexShrink: 0,
        borderRadius: 8,
        borderBottomWidth: 0.5,
        borderBottomColor: '#F7F8F8'
    },
    textWrapper: {
        flex: 1,
        justifyContent: 'space-between',
        marginLeft: 10
    },
    setting__label: {
        fontSize: 14,
        lineHeight: 21,
        fontWeight: '400',
        color: '#1D1617'
    },
    subText: {
        fontSize: 10,
        color: '#7B6F72',
        marginTop: 1,
        fontWeight: '400'
    }
})

export default memo(SettingItem)
