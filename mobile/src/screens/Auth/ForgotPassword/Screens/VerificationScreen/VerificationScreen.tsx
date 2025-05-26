import React, { memo } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FormProvider } from 'react-hook-form'
import { FontAwesome } from '@expo/vector-icons'

import GradientButton from '@/components/GradientButton'
import TextGradient from '@/components/TextGradient'
import OTPInput from '@/components/OTPInput'
import { SCREEN_WIDTH } from '@/constants/devices.constant'
import { useOTPVerification } from '@/hooks/useOTPVerification'
import { authApi } from '@/services/rest'
import { useFacebookLogin } from '@/hooks/useFacebookLogin'

interface VerificationScreenProps {
    onSuccess: (otp: string) => void
    email: string
    onSingUp: () => void
}

function VerificationScreen({ onSuccess, email, onSingUp }: VerificationScreenProps) {
    const { methods, handleSubmit, handleResend, countdown, isVerifying } = useOTPVerification({
        email,
        onSuccess,
        verifyFn: authApi.verifyOtpForgotPassword,
        resendFn: authApi.resentOTPForgotPassword
    })
    const { loginWithFacebook } = useFacebookLogin()

    return (
        <FormProvider {...methods}>
            <View style={styles.wrapper}>
                {/* Title & OTP Input */}
                <View>
                    <Text style={styles.title}>Enter Verification Code</Text>
                    <View style={styles.otpWrapper}>
                        <OTPInput name='otp' otpLength={4} />
                    </View>
                </View>

                {/* Actions */}
                <View>
                    {/* Resend OTP */}
                    <TouchableOpacity style={styles.resendWrapper} disabled={countdown > 0} onPress={handleResend}>
                        <Text style={styles.resendText}>
                            {countdown > 0 ? `You can resend in ${countdown}s` : `If you didn’t receive a code,`}
                        </Text>
                        {countdown === 0 && <TextGradient style={styles.resendStrong} text=' Resend' />}
                    </TouchableOpacity>
                    {/* Submit Button */}
                    <GradientButton
                        Square
                        style={styles.submitBtn}
                        onPress={handleSubmit}
                        isLoading={isVerifying}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.submitText}>Send</Text>
                    </GradientButton>
                    {/* Sign Up */}
                    <Text style={styles.haveAccountText}>Do you have an account?</Text>
                    <TouchableOpacity style={styles.signupBtn} onPress={onSingUp}>
                        <Text style={styles.signupText}>Sign up</Text>
                    </TouchableOpacity>
                    {/* Facebook Login
                    <TouchableOpacity style={styles.facebookBtn} onPress={loginWithFacebook}>
                        <View style={styles.facebookContent}>
                            <FontAwesome name='facebook' size={20} color='#8F8F8F' style={{ marginRight: 8 }} />
                            <Text style={styles.facebookText}>Login with Facebook</Text>
                        </View>
                    </TouchableOpacity> */}
                </View>
            </View>
        </FormProvider>
    )
}

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
        alignItems: 'center'
    },
    signupText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#8F8F8F'
    },
    facebookBtn: {
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
    facebookText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#8F8F8F'
    },
    facebookContent: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default memo(VerificationScreen)
