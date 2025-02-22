import React, { memo } from 'react'
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

interface ButtonProps {
    onPress?: () => void
    children: React.ReactNode
    primary?: boolean
    outline?: boolean
    text?: boolean
    iconLeft?: string
    iconRight?: string
    style?: object
    colors?: string[]
    textColor?: string
    rounded?: boolean
}

const Button: React.FC<ButtonProps> = ({
    onPress,
    children,
    outline,
    primary = true,
    rounded,
    text,
    iconLeft,
    iconRight,
    style,
    colors = ['#92A3FD', '#9DCEFF'],
    textColor
}) => {
    const defaultTextColor = textColor || (outline ? colors[0] : '#FFF')
    const gradientColors = colors.length >= 2 ? colors : ['#92A3FD', '#9DCEFF']

    const content = (
        <View style={[styles.buttonContent, text && styles.textButton]}>
            {iconLeft && <Icon name={iconLeft} size={24} color={defaultTextColor} />}
            <Text style={[styles.text, { color: defaultTextColor }]}>{children}</Text>
            {iconRight && <Icon name={iconRight} size={24} color={defaultTextColor} />}
        </View>
    )

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[style, primary ? styles.primaryButton : styles.button, outline && styles.outlineButton]}
            activeOpacity={0.8}
        >
            {primary ? (
                <LinearGradient colors={gradientColors as [string, string]} style={styles.gradient}>
                    {content}
                </LinearGradient>
            ) : (
                content
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 99,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    primaryButton: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: 'rgba(149, 173, 254, 0.30)',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 22
    },
    gradient: {
        width: '100%',
        height: '100%',
        borderRadius: 99,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 8
    },
    outlineButton: {},
    textButton: {
        backgroundColor: 'transparent'
    }
})

export default memo(Button)
