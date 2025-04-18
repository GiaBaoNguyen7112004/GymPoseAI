import { useState } from 'react'
import { useController, UseControllerProps } from 'react-hook-form'
import { KeyboardTypeOptions, StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MyIcon from '@/components/Icon'
import { IconName } from '@/constants/icon.constants'

export interface ControllerInputProps extends Omit<TextInputProps, 'defaultValue'>, UseControllerProps {
    type: KeyboardTypeOptions | 'password'
    icon: IconName
}

function ControlledInput({ type = 'default', icon, name, rules, defaultValue, ...inputProps }: ControllerInputProps) {
    const { field, fieldState } = useController({ name, rules, defaultValue })
    const errorMessage = fieldState.error?.message
    const isPassword = type == 'password'
    const [isHidePassword, setHidePassword] = useState<boolean>(isPassword)
    const toggleHidePassword = () => {
        setHidePassword((prev) => !prev)
    }

    return (
        <View style={styles.inputWrapper}>
            <MyIcon name={icon} size={18} style={styles.icon} />
            <TextInput
                secureTextEntry={isHidePassword}
                style={styles.input}
                {...inputProps}
                placeholderTextColor='#ADA4A5'
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                value={field.value?.toString() ?? ''}
                keyboardType={type != 'password' ? type : 'default'}
            />
            {isPassword && (
                <TouchableOpacity style={styles.hidePasswordIcon} onPress={toggleHidePassword}>
                    <MaterialCommunityIcons
                        name={isHidePassword ? 'eye-off-outline' : 'eye-outline'}
                        size={20}
                        color={isHidePassword ? '#333' : '#318bfb'}
                    />
                </TouchableOpacity>
            )}
            {errorMessage && <Text style={styles.error_msg}> {errorMessage}</Text>}
        </View>
    )
}

export default ControlledInput

const styles = StyleSheet.create({
    inputWrapper: {
        width: '100%',
        height: 48,
        paddingHorizontal: 15,
        borderRadius: 14,
        borderColor: '#F7F8F8',
        borderWidth: 1,
        backgroundColor: '#F7F8F8',
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        flex: 1
    },
    icon: {
        marginRight: 10
    },
    hidePasswordIcon: {
        position: 'absolute',
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        right: 5,
        top: (44 - 30) / 2,
        backgroundColor: '#F7F8F8'
    },
    error_msg: {
        color: '#FF0000',
        fontSize: 12,
        position: 'absolute',
        bottom: -14,
        left: 10
    }
})
