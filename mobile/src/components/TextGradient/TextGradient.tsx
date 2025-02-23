import React from 'react'
import { Text, View, StyleSheet, ViewStyle, TextStyle } from 'react-native'
import MaskedView from '@react-native-masked-view/masked-view'
import { LinearGradient } from 'expo-linear-gradient'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export interface TextGradientProps {
    text: string
    icon?: {
        name: string
        size: number
    }
    colors?: string[]
    start?: { x: number; y: number }
    end?: { x: number; y: number }
    textStyle?: TextStyle
    containerStyle?: ViewStyle
    style?: TextStyle
}

const TextGradientComponent = (props: TextGradientProps) => {
    const {
        text,
        icon,
        colors = ['#92A3FD', '#9DCEFF'],
        start = { x: 0.2, y: 0 },
        end = { x: 1, y: 1 },
        textStyle,
        containerStyle,
        style,
        ...rest
    } = props

    const restProps = rest as React.ComponentProps<typeof Text>

    return (
        <MaskedView
            maskElement={
                <View style={[styles.maskContainer, containerStyle]}>
                    {icon && <Icon name={icon.name} size={icon.size} />}
                    <Text style={[styles.gradientText, textStyle, style, restProps.style]}>{text}</Text>
                </View>
            }
        >
            <LinearGradient colors={colors as [string, string, ...string[]]} start={start} end={end}>
                <View style={[styles.gradientContainer, containerStyle]}>
                    {icon && <Icon name={icon.name} size={icon.size} color='rgba(0,0,0,0)' />}
                    <Text style={[styles.gradientText, textStyle, style, restProps.style, styles.transparentText]}>
                        {text}
                    </Text>
                </View>
            </LinearGradient>
        </MaskedView>
    )
}

export default TextGradientComponent

const styles = StyleSheet.create({
    maskContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    gradientContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    gradientText: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    transparentText: {
        opacity: 0
    }
})
