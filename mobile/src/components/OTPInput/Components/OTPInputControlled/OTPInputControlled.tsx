import { useController, UseControllerProps } from 'react-hook-form'
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'
import { useRef, useState, useEffect } from 'react'

export interface OTPInputControlledProps extends Omit<TextInputProps, 'defaultValue'>, UseControllerProps {
    otpLength: number
}

function OTPInputControlled({ otpLength, name, rules, defaultValue = '', ...inputProps }: OTPInputControlledProps) {
    const { field, fieldState } = useController({ name, rules, defaultValue })
    const errorMessage = fieldState.error?.message

    const [code, setCode] = useState<string[]>(Array(otpLength).fill(''))
    const inputRefs = useRef<Array<TextInput | null>>([])

    useEffect(() => {
        field.onChange(code.join(''))
    }, [code])

    const handleCodeChange = (text: string, index: number) => {
        const newCode = [...code]
        newCode[index] = text
        setCode(newCode)

        if (text && index < otpLength - 1) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyPress = (event: any, index: number) => {
        if (event.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handleFocus = (index: number) => {
        const newCode = [...code]
        for (let i = index; i < otpLength; i++) {
            if (!newCode[i]) {
                newCode[i] = ''
            }
        }
        setCode(newCode)
    }

    return (
        <View style={styles.formCodeWrapper}>
            <View style={styles.codeContainer}>
                {code.map((digit, i) => (
                    <View key={i} style={styles.inputRounded}>
                        <TextInput
                            ref={(ref) => (inputRefs.current[i] = ref)}
                            style={styles.input_code}
                            keyboardType='numeric'
                            maxLength={1}
                            value={digit}
                            onChangeText={(text) => handleCodeChange(text, i)}
                            onKeyPress={(event) => handleKeyPress(event, i)}
                            onFocus={() => handleFocus(i)}
                            {...inputProps}
                            autoFocus={i === 0}
                        />
                    </View>
                ))}
            </View>

            {errorMessage && <Text style={styles.error_msg}> {errorMessage}</Text>}
        </View>
    )
}

export default OTPInputControlled

const styles = StyleSheet.create({
    formCodeWrapper: {
        width: '100%',
        columnGap: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    codeContainer: {
        width: '100%',
        flexDirection: 'row',
        columnGap: 20,
        justifyContent: 'center'
    },
    inputRounded: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 999,
        borderWidth: 1,
        borderColor: '#444'
    },
    input_code: {
        width: '100%',
        height: '100%',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '600',
        color: '#444'
    },
    error_msg: {
        marginTop: 10,
        color: '#FF0000',
        fontSize: 12
    }
})
