import { useController, UseControllerProps } from 'react-hook-form'
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'
import { useRef, useState, useEffect, useMemo, useCallback, memo } from 'react'

export interface OTPInputControlledProps extends Omit<TextInputProps, 'defaultValue'>, UseControllerProps {
    otpLength: number
    inputSize?: number
    gap?: number
    activeColor?: string
    inactiveColor?: string
    errorColor?: string
}

function OTPInputControlled({
    otpLength,
    name,
    rules,
    defaultValue = '',
    inputSize = 50,
    gap = 16,
    activeColor = '#1E90FF',
    inactiveColor = '#444',
    errorColor = '#FF0000',
    ...inputProps
}: OTPInputControlledProps) {
    const { field, fieldState } = useController({ name, rules, defaultValue })
    const errorMessage = fieldState.error?.message

    const [code, setCode] = useState<string[]>(Array(otpLength).fill(''))
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null)
    const inputRefs = useRef<Array<TextInput | null>>([])

    useEffect(() => {
        field.onChange(code.join(''))
    }, [code, field])

    const handleCodeChange = useCallback(
        (text: string, index: number) => {
            if (text !== '' && !/^[0-9]$/.test(text)) return

            const newCode = [...code]
            newCode[index] = text
            setCode(newCode)

            if (text && index < otpLength - 1) {
                inputRefs.current[index + 1]?.focus()
            }
        },
        [code, otpLength]
    )

    const handleKeyPress = useCallback(
        (event: any, index: number) => {
            if (event.nativeEvent.key === 'Backspace') {
                const newCode = [...code]

                // Nếu ô hiện tại có giá trị, xoá giá trị của ô đó
                if (newCode[index]) {
                    newCode[index] = ''
                    setCode(newCode)
                }
                // Nếu ô hiện tại rỗng, di chuyển đến ô trước và xoá giá trị của ô đó
                else if (index > 0) {
                    // Xoá ô hiện tại và ô trước
                    newCode[index - 1] = ''
                    setCode(newCode)

                    // Focus vào ô trước
                    inputRefs.current[index - 1]?.focus()
                }
            }
        },
        [code]
    )

    const handleFocus = useCallback((index: number) => {
        setFocusedIndex(index)
    }, [])

    const handleBlur = useCallback(() => {
        setFocusedIndex(null)
    }, [])

    const styles = useMemo(
        () =>
            StyleSheet.create({
                formCodeWrapper: {
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                },
                codeContainer: {
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    columnGap: gap
                },
                inputWrapper: {
                    width: inputSize,
                    height: inputSize,
                    justifyContent: 'center',
                    alignItems: 'center'
                },
                inputUnderline: {
                    width: '100%',
                    height: 2,
                    backgroundColor: inactiveColor,
                    position: 'absolute',
                    bottom: 0,
                    borderRadius: 2
                },
                inputUnderlineActive: {
                    backgroundColor: activeColor,
                    transform: [{ scaleX: 1.1 }]
                },
                inputUnderlineError: {
                    backgroundColor: errorColor
                },
                input_code: {
                    width: '100%',
                    height: '100%',
                    textAlign: 'center',
                    fontSize: inputSize * 0.5,
                    fontWeight: '600',
                    color: inactiveColor
                },
                error_msg: {
                    marginTop: 12,
                    color: errorColor,
                    fontSize: 12,
                    textAlign: 'center'
                }
            }),
        [gap, inputSize, activeColor, inactiveColor, errorColor]
    )

    return (
        <View style={styles.formCodeWrapper}>
            <View style={styles.codeContainer}>
                {Array.from({ length: otpLength }).map((_, i) => (
                    <View key={i} style={styles.inputWrapper}>
                        <TextInput
                            ref={(ref) => (inputRefs.current[i] = ref)}
                            style={styles.input_code}
                            keyboardType='numeric'
                            maxLength={1}
                            value={code[i] || ''}
                            onChangeText={(text) => handleCodeChange(text, i)}
                            onKeyPress={(event) => handleKeyPress(event, i)}
                            onFocus={() => handleFocus(i)}
                            onBlur={handleBlur}
                            {...inputProps}
                            autoFocus={i === 0}
                            accessible
                            accessibilityLabel={`OTP input ${i + 1}`}
                        />
                        <View
                            style={[
                                styles.inputUnderline,
                                focusedIndex === i && styles.inputUnderlineActive,
                                errorMessage && styles.inputUnderlineError
                            ]}
                        />
                    </View>
                ))}
            </View>
            {errorMessage && <Text style={styles.error_msg}>{errorMessage}</Text>}
        </View>
    )
}

export default memo(OTPInputControlled)
