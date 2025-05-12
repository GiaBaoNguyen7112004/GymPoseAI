import { memo, useState, forwardRef, useCallback } from 'react'
import { useController, UseControllerProps } from 'react-hook-form'
import {
    KeyboardTypeOptions,
    StyleProp,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
    ViewStyle
} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MyIcon from '@/components/Icon'
import { IconName } from '@/constants/icon.constants'

export interface ControllerInputProps extends Omit<TextInputProps, 'defaultValue'>, UseControllerProps {
    type?: KeyboardTypeOptions | 'password'
    icon?: IconName
    containerStyle?: StyleProp<ViewStyle>
}

const ControlledInput = forwardRef<TextInput, ControllerInputProps>(
    (
        {
            type = 'default',
            icon,
            name,
            rules,
            defaultValue,
            style,
            containerStyle,
            ...inputProps
        }: ControllerInputProps,
        ref
    ) => {
        const { field, fieldState } = useController({ name, rules, defaultValue })
        const [isHidePassword, setHidePassword] = useState(type === 'password')

        const showError = Boolean(fieldState.error?.message)
        const togglePasswordVisibility = useCallback(() => setHidePassword((prev) => !prev), [])

        return (
            <View style={[styles.inputWrapper, containerStyle, showError && styles.errorBorder]}>
                {icon && <MyIcon name={icon} size={18} style={styles.icon} />}
                <TextInput
                    {...inputProps}
                    ref={ref}
                    value={field.value?.toString() ?? ''}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    placeholderTextColor='#ADA4A5'
                    secureTextEntry={isHidePassword}
                    keyboardType={type !== 'password' ? type : 'default'}
                    style={[styles.input, style, !icon && { paddingLeft: 4 }]}
                />
                {type === 'password' && (
                    <TouchableOpacity style={styles.passwordToggle} onPress={togglePasswordVisibility}>
                        <MaterialCommunityIcons
                            name={isHidePassword ? 'eye-off-outline' : 'eye-outline'}
                            size={20}
                            color={isHidePassword ? '#333' : '#318bfb'}
                        />
                    </TouchableOpacity>
                )}
                {showError && <Text style={styles.errorMessage}>{fieldState.error?.message}</Text>}
            </View>
        )
    }
)

export default memo(ControlledInput)

const styles = StyleSheet.create({
    inputWrapper: {
        width: '100%',
        height: 48,
        paddingHorizontal: 15,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#F7F8F8',
        backgroundColor: '#F7F8F8',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative'
    },
    input: {
        flex: 1,
        backgroundColor: '#F7F8F8',
        color: '#1D1617'
    },
    icon: {
        marginRight: 10
    },
    passwordToggle: {
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: 30
    },
    errorMessage: {
        position: 'absolute',
        bottom: -18,
        left: 10,
        color: '#FF0000',
        fontSize: 12
    },
    errorBorder: {
        borderColor: '#FF0000'
    }
})
