import React, { memo } from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import MyIcon from '@/components/Icon'
import { IconName } from '@/constants/icon.constants'

interface TabIconProps {
    iconName: IconName
    iconActive: IconName
    focused: boolean
    size?: number
    color?: string
    containerStyle?: ViewStyle
}

function TabBarIcon({ iconName, iconActive, focused, size = 23, color, containerStyle }: TabIconProps) {
    const iconToShow = focused ? iconActive : iconName

    return (
        <View style={[styles.iconContainer, containerStyle]}>
            <MyIcon name={iconToShow} size={size} color={color} />
        </View>
    )
}

const styles = StyleSheet.create({
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    dotIndicator: {
        position: 'absolute',
        bottom: -8
    }
})

export default memo(TabBarIcon)
