import React, { memo } from 'react'
import { TouchableOpacity, Text, StyleSheet, View, ViewStyle } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacityProps } from 'react-native-gesture-handler'
import { StyleProp } from 'react-native'

interface ButtonProps {
    onPress?: () => void
    children?: React.ReactNode
    primary?: boolean
    outline?: boolean
    style?: StyleProp<ViewStyle>
    linerColors?: string[]
    rounded?: boolean
    Square?: boolean
    disabled?: boolean
}

const GradientButton: React.FC<ButtonProps & TouchableOpacityProps> = ({
    onPress,
    children,
    Square,
    linerColors = ['#92A3FD', '#9DCEFF'],
    disabled,
    style,
    ...props
}) => {
    const gradientColors = linerColors.length >= 2 ? linerColors : ['#92A3FD', '#9DCEFF']

    return (
        <TouchableOpacity onPress={onPress} disabled={disabled} style={style} {...props}>
            <LinearGradient
                colors={gradientColors as [string, string, ...string[]]}
                start={{ x: 1, y: 0.5 }}
                end={{ x: 0, y: 0.5 }}
                style={[styles.container, Square ? styles.square : styles.rounded]}
            >
                {children}
            </LinearGradient>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 15,
        width: '100%',
        maxHeight: 60,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    square: {
        borderRadius: 14
    },
    rounded: {
        borderRadius: 999
    }
})
export default memo(GradientButton)
