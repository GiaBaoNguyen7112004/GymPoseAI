import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import LottieView from 'lottie-react-native'

import GradientButton from '@/components/GradientButton'
import { SCREEN_WIDTH } from '@/constants/devices.constant'
import { useMutation } from '@tanstack/react-query'
import { authApi } from '@/services/rest'
import { RootStackScreenProps } from '@/navigation/types'

const VerifyAccountScreen = ({ navigation, route }: RootStackScreenProps<'verifyAccount'>) => {
    const { account_verification_token } = route.params

    const [isVerifying, setIsVerifying] = useState(true)
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null)

    const { mutateAsync } = useMutation({
        mutationFn: authApi.verifyAccount
    })

    const handleVerifyAccount = useCallback(async () => {
        setIsVerifying(true)
        try {
            await mutateAsync({ account_verification_token })
            setIsSuccess(true)
        } catch (error) {
            setIsSuccess(false)
        } finally {
            setIsVerifying(false)
        }
    }, [account_verification_token, mutateAsync])

    useEffect(() => {
        handleVerifyAccount()
    }, [handleVerifyAccount])

    const handleContinue = useCallback(() => {
        navigation.replace('Login')
    }, [navigation])

    const handleRetry = useCallback(() => {
        handleVerifyAccount()
    }, [handleVerifyAccount])

    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.container}>
                <View style={styles.topSection}>
                    {!isVerifying && (
                        <LottieView
                            source={
                                isSuccess
                                    ? require('@/assets/animations/verify_success.json')
                                    : require('@/assets/animations/verify_fail.json')
                            }
                            autoPlay
                            loop={false}
                            style={styles.banner}
                        />
                    )}
                    <View style={styles.textContainer}>
                        {isVerifying ? (
                            <>
                                <Text style={styles.heading}>Verifying your account...</Text>
                                <ActivityIndicator style={{ marginTop: 10 }} size='large' color='#7B6F72' />
                            </>
                        ) : isSuccess ? (
                            <>
                                <Text style={styles.heading}>Account Verified!</Text>
                                <Text style={styles.description}>Your account has been successfully verified.</Text>
                            </>
                        ) : (
                            <>
                                <Text style={styles.heading}>Verification Failed</Text>
                                <Text style={styles.description}>
                                    We could not verify your account. Please try again.
                                </Text>
                            </>
                        )}
                    </View>
                </View>

                {!isVerifying && (
                    <GradientButton
                        containerStyle={styles.button}
                        Square
                        onPress={isSuccess ? handleContinue : handleRetry}
                    >
                        <Text style={styles.buttonText}>{isSuccess ? 'Go To Home' : 'Try Again'}</Text>
                    </GradientButton>
                )}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    topSection: {
        marginTop: 20,
        alignItems: 'center'
    },
    textContainer: {
        marginTop: 30,
        alignItems: 'center',
        maxWidth: 250,
        paddingHorizontal: 16
    },
    heading: {
        fontSize: 24,
        fontWeight: '700',
        lineHeight: 30,
        color: '#1D1617',
        textAlign: 'center'
    },
    description: {
        marginTop: 5,
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
        textAlign: 'center',
        color: '#7B6F72'
    },
    banner: {
        width: 300,
        height: 300
    },
    button: {
        width: SCREEN_WIDTH * 0.9,
        marginBottom: 39
    },
    buttonText: {
        color: '#FFF',
        fontWeight: '700',
        fontSize: 16
    }
})

export default VerifyAccountScreen
