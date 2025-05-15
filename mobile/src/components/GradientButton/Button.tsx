import { memo } from 'react'
import { Pressable, StyleSheet, GestureResponderEvent, View, StyleProp, ViewStyle } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Loader from '../Loader'

interface ButtonProps {
    onPress?: (event: GestureResponderEvent) => void
    children?: React.ReactNode
    style?: StyleProp<ViewStyle>
    linerColors?: string[]
    Square?: boolean
    disabled?: boolean
    isLoading?: boolean
    rounded?: boolean
    containerStyle?: StyleProp<ViewStyle>
    [key: string]: any
}

const GradientButton: React.FC<ButtonProps> = ({
    onPress,
    children,
    Square = false,
    linerColors = ['#92A3FD', '#9DCEFF'],
    disabled = false,
    isLoading = false,
    style,
    containerStyle,
    rounded = false,
    ...props
}) => {
    const gradientColors = linerColors.length >= 2 ? linerColors : ['#92A3FD', '#9DCEFF']
    const isDisabled = disabled || isLoading

    return (
        <Pressable
            onPress={onPress}
            disabled={isDisabled}
            style={({ pressed }) => [containerStyle, pressed && !isDisabled && styles.pressed]}
            {...props}
        >
            <LinearGradient
                colors={gradientColors as [string, string, ...string[]]}
                start={{ x: 1, y: 0.5 }}
                end={{ x: 0, y: 0.5 }}
                style={[
                    styles.container,
                    style,
                    Square && styles.square,
                    rounded && styles.rounded,
                    { opacity: isDisabled ? 0.6 : 1 }
                ]}
            >
                {children}
                {isLoading && (
                    <View style={styles.loaderWrapper}>
                        <Loader />
                    </View>
                )}
            </LinearGradient>
        </Pressable>
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
        borderRadius: 999
    },
    rounded: {
        borderRadius: 999,
        aspectRatio: 1 / 1
    },
    loaderWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
    },
    pressed: {
        opacity: 0.7
    }
})

export default memo(GradientButton)
