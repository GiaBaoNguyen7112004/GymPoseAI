import React, { memo } from 'react'
import { View, Text, StyleSheet, ViewStyle, TextStyle, Pressable, GestureResponderEvent } from 'react-native'

interface MenuItemProps {
    icon?: React.ReactNode
    iconBg?: string
    title?: string
    subText?: string
    rightContent?: React.ReactNode
    disabled?: boolean
    containerStyle?: ViewStyle
    textStyle?: TextStyle
    onPress?: (event: GestureResponderEvent) => void
}

const MenuItem: React.FC<MenuItemProps> = ({
    icon,
    iconBg = '#1D1617',
    title,
    subText,
    rightContent,
    disabled = false,
    containerStyle,
    textStyle,
    onPress
}) => {
    return (
        <Pressable style={[styles.menuItem, disabled && styles.disabled, containerStyle]} onPress={onPress}>
            {icon && <View style={[styles.iconContainer, { backgroundColor: iconBg }]}>{icon}</View>}
            <View style={styles.menuItemContent}>
                <View style={styles.row}>
                    <Text style={[styles.menuText, textStyle]}>{title}</Text>
                    {rightContent && <View style={styles.rightContent}>{rightContent}</View>}
                </View>
                {subText && <Text style={styles.subText}>{subText}</Text>}
            </View>
        </Pressable>
    )
}

export default memo(MenuItem)

const styles = StyleSheet.create({
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: '#DDDADA'
    },
    iconContainer: {
        width: 30,
        height: 30,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12
    },
    menuItemContent: {
        flex: 1
    },
    menuText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#1D1617'
    },
    subText: {
        fontSize: 13,
        color: '#7B6F72',
        marginTop: 1,
        fontWeight: '400'
    },
    rightContent: {
        marginLeft: 'auto'
    },
    disabled: {
        opacity: 0.5
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})
