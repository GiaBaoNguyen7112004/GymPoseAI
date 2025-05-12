import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle, memo, useMemo, useCallback } from 'react'
import { View, StyleSheet, Animated, PanResponder, Easing, Pressable } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

interface CustomGradientSwitchProps {
    value: boolean
    onValueChange: (value: boolean) => void
    width?: number
    height?: number
    thumbColor?: string
    gradientColors?: [string, string, ...string[]]
    thumbRadius?: number
}

const CustomGradientSwitch = forwardRef<any, CustomGradientSwitchProps>(
    (
        {
            thumbRadius = 7,
            value,
            onValueChange,
            width = 44,
            height = 24,
            thumbColor = '#F7F8F8',
            gradientColors = ['#C58BF2', '#EEA4CE']
        },
        ref
    ) => {
        const padding = useMemo(() => thumbRadius * 0.7, [thumbRadius])

        const [internalValue, setInternalValue] = useState(value)
        const translateX = useRef(new Animated.Value(value ? width - 2 * thumbRadius - padding : padding)).current

        useEffect(() => {
            setInternalValue(value)
            Animated.timing(translateX, {
                toValue: value ? width - 2 * thumbRadius - padding : padding,
                duration: 100,
                useNativeDriver: true,
                easing: Easing.ease
            }).start()
        }, [value, width, thumbRadius, padding])

        const panResponder = useRef(
            PanResponder.create({
                onStartShouldSetPanResponder: () => true,
                onMoveShouldSetPanResponder: () => true,
                onPanResponderMove: (_, gestureState) => {
                    const newX = Math.max(
                        padding,
                        Math.min(
                            width - 2 * thumbRadius - padding,
                            gestureState.dx + (internalValue ? width - 2 * thumbRadius - padding : padding)
                        )
                    )
                    translateX.setValue(newX)
                },
                onPanResponderRelease: (_, gestureState) => {
                    const newValue = gestureState.moveX >= width / 2
                    setInternalValue(newValue)
                    onValueChange(newValue)
                    Animated.timing(translateX, {
                        toValue: newValue ? width - 2 * thumbRadius - padding : padding,
                        duration: 100,
                        useNativeDriver: true,
                        easing: Easing.ease
                    }).start()
                }
            })
        ).current

        const handlePress = useCallback(() => {
            const newValue = !internalValue
            setInternalValue(newValue)
            onValueChange(newValue)
            Animated.timing(translateX, {
                toValue: newValue ? width - 2 * thumbRadius - padding : padding,
                duration: 200,
                useNativeDriver: true,
                easing: Easing.ease
            }).start()
        }, [])

        useImperativeHandle(ref, () => ({
            toggle: handlePress
        }))

        return (
            <Pressable onPress={handlePress}>
                <View style={[styles.container, { width, height, borderRadius: height / 2 }]}>
                    {internalValue ? (
                        <LinearGradient
                            colors={gradientColors}
                            style={[StyleSheet.absoluteFillObject, { borderRadius: height / 2 }]}
                            start={{ x: 1, y: 1 }}
                            end={{ x: 0, y: 0 }}
                        />
                    ) : null}
                    <Animated.View
                        style={[
                            styles.thumb,
                            {
                                width: thumbRadius * 2,
                                height: thumbRadius * 2,
                                borderRadius: thumbRadius,
                                backgroundColor: thumbColor,
                                transform: [{ translateX }]
                            }
                        ]}
                        {...panResponder.panHandlers}
                    />
                </View>
            </Pressable>
        )
    }
)

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#DDDADA',
        justifyContent: 'center',
        padding: 0
    },
    thumb: {
        position: 'absolute',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84
    }
})

export default memo(CustomGradientSwitch)
