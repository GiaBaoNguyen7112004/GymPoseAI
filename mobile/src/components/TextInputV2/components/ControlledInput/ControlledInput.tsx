import { useEffect, useRef, useState } from 'react'
import { useController, UseControllerProps } from 'react-hook-form'
import {
    KeyboardTypeOptions,
    StyleSheet,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
    TouchableWithoutFeedback,
    NativeSyntheticEvent,
    TextInputFocusEventData
} from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolate } from 'react-native-reanimated'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export interface ControllerInputProps extends Omit<TextInputProps, 'defaultValue'>, UseControllerProps {
    type?: KeyboardTypeOptions | 'password'
    label: string
    noBorderBottom?: boolean
}

function ControlledInput({
    type = 'default',
    name,
    rules,
    defaultValue,
    label,
    noBorderBottom,
    ...rest
}: ControllerInputProps) {
    const { field } = useController({ name, rules, defaultValue })
    const isPassword = type === 'password'

    const [isPasswordHidden, setPasswordHidden] = useState(true)
    const [isFocused, setIsFocused] = useState(false)
    const inputRef = useRef<TextInput>(null)

    const animatedValue = useSharedValue(field.value ? 1 : 0)

    useEffect(() => {
        animatedValue.value = withTiming(isFocused || !!field.value ? 1 : 0, { duration: 200 })
    }, [isFocused, field.value])

    const labelStyle = useAnimatedStyle(() => ({
        position: 'absolute',
        left: 15,
        top: interpolate(animatedValue.value, [0, 1], [16, 0]),
        fontSize: interpolate(animatedValue.value, [0, 1], [17, 14]),
        color: '#80848D',
        backgroundColor: 'transparent',
        zIndex: 1
    }))

    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setIsFocused(true)
        rest.onFocus?.(e)
    }

    const handleBlur = () => {
        setIsFocused(false)
        field.onBlur()
    }

    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.inputWrapper,
                    isFocused && !noBorderBottom && styles.inputWrapperFocused,
                    noBorderBottom && { borderBottomColor: '#F7F8F8' }
                ]}
            >
                <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
                    <Animated.Text style={[styles.label, labelStyle]}>{label}</Animated.Text>
                </TouchableWithoutFeedback>

                <TextInput
                    ref={inputRef}
                    secureTextEntry={isPassword && isPasswordHidden}
                    style={styles.input}
                    placeholderTextColor='transparent'
                    keyboardType={isPassword ? 'default' : type}
                    onChangeText={field.onChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={field.value?.toString() ?? ''}
                    {...rest}
                />

                {isPassword && (
                    <TouchableOpacity style={styles.iconWrapper} onPress={() => setPasswordHidden((prev) => !prev)}>
                        <MaterialCommunityIcons
                            name={isPasswordHidden ? 'eye-off-outline' : 'eye-outline'}
                            size={20}
                            color={isPasswordHidden ? '#333' : '#318bfb'}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default ControlledInput

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    inputWrapper: {
        width: '100%',
        height: 56,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#F7F8F8',
        backgroundColor: '#F7F8F8',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        borderBottomColor: '#DDDADA'
    },
    inputWrapperFocused: {
        borderBottomColor: '#ADA4A5'
    },
    input: {
        flex: 1,
        paddingTop: 10,
        fontSize: 17,
        color: '#1f2937'
    },
    label: {
        fontSize: 14
    },
    iconWrapper: {
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
