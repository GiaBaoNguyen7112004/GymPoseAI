import { useEffect, useRef, useState } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'

import GradientButton from '@/src/components/GradientButton'
import TextGradient from '@/src/components/TextGradient'
import OTPInput from '@/src/components/OTPInput'
import { SCREEN_WIDTH } from '@/src/constants/devices.constant'
import { schema, SchemaType } from '@/src/utils/rules.util'
import { authApi } from '@/src/services/rest'

interface VerificationScreenProps {
    onSuccess: (otp: string) => void
    email: string
    onSingUp: () => void
}

type FormData = Pick<SchemaType, 'otp'>
const formSchema = schema.pick(['otp'])

const RESEND_TIMEOUT = 10

function VerificationScreen({ onSuccess, email, onSingUp }: VerificationScreenProps) {
    const methods = useForm<FormData>({
        defaultValues: { otp: '' },
        resolver: yupResolver(formSchema),
        mode: 'onBlur'
    })

    const { handleSubmit } = methods

    const [countdown, setCountdown] = useState(0)
    const timerId = useRef<NodeJS.Timeout | null>(null)

    const { mutate: verifyOtp, isPending: isVerifying } = useMutation({
        mutationFn: authApi.verifyOtpForgotPassword
    })

    const { mutate: resendOtp, isPending: isResending } = useMutation({
        mutationFn: authApi.resentOTPForgotPassword
    })

    const onSubmit = handleSubmit(({ otp }) => {
        verifyOtp(
            { email, otp },
            {
                onSuccess: () => onSuccess(otp),
                onError: () => {
                    Alert.alert("That code didn't work", 'Please re-enter your code or request a new one', [
                        { text: 'Try again' }
                    ])
                }
            }
        )
    })

    const handleResend = () => {
        if (countdown > 0 || isResending) return
        setCountdown(RESEND_TIMEOUT)
        resendOtp({ email })
    }

    useEffect(() => {
        if (countdown <= 0 || timerId.current) return

        timerId.current = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1 && timerId.current) {
                    clearInterval(timerId.current)
                    timerId.current = null
                }
                return prev - 1
            })
        }, 1000)

        return () => {
            if (timerId.current) {
                clearInterval(timerId.current)
                timerId.current = null
            }
        }
    }, [countdown])

    return (
        <FormProvider {...methods}>
            <View style={styles.wrapper}>
                <View>
                    <Text style={styles.title}>Enter Verification Code</Text>
                    <View style={styles.otpWrapper}>
                        <OTPInput name='otp' otpLength={4} />
                    </View>
                </View>

                <View>
                    <TouchableOpacity style={styles.resendWrapper} disabled={countdown > 0} onPress={handleResend}>
                        <Text style={styles.resendText}>
                            {countdown > 0 ? `You can resend in ${countdown}s` : `If you didn’t receive a code,`}
                        </Text>
                        {countdown === 0 && <TextGradient style={styles.resendStrong} text=' Resend' />}
                    </TouchableOpacity>

                    <GradientButton
                        Square
                        style={styles.submitBtn}
                        onPress={onSubmit}
                        isLoading={isVerifying}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.submitText}>Send</Text>
                    </GradientButton>

                    <Text style={styles.haveAccountText}>Do you have an account?</Text>
                    <TouchableOpacity style={styles.signupBtn} onPress={onSingUp}>
                        <Text style={styles.signupText}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </FormProvider>
    )
}

export default VerificationScreen

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        marginTop: 72,
        fontSize: 16,
        fontWeight: '600',
        color: '#1D1617',
        alignSelf: 'center'
    },
    otpWrapper: {
        marginTop: 26,
        width: SCREEN_WIDTH * 0.9
    },
    resendWrapper: {
        marginTop: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    resendText: {
        fontSize: 14,
        color: '#ABABAB',
        fontWeight: '500'
    },
    resendStrong: {
        fontSize: 14,
        fontWeight: '500'
    },
    submitBtn: {
        marginTop: 30,
        width: SCREEN_WIDTH * 0.9,
        marginBottom: 29
    },
    submitText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '700'
    },
    haveAccountText: {
        fontSize: 12,
        color: '#ABABAB',
        fontWeight: '500',
        alignSelf: 'center',
        marginTop: 30
    },
    signupBtn: {
        marginTop: 18,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: '#444',
        width: SCREEN_WIDTH * 0.9,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 100
    },
    signupText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#8F8F8F'
    }
})
