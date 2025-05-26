import React, { useMemo, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import LottieView from 'lottie-react-native'

import GradientButton from '@/components/GradientButton'
import { SCREEN_WIDTH } from '@/constants/devices.constant'
import { RootStackScreenProps } from '@/navigation/types'
import useUserData from '@/hooks/useUserData'
import useNavigationState from '@/hooks/useNavigationState'

const WelcomeScreen = ({ navigation }: RootStackScreenProps<'Welcome'>) => {
    const { isNavigating } = useNavigationState(navigation)
    const { userData } = useUserData()

    const isProfileComplete = useMemo(() => Boolean(userData?.is_profile_complete), [userData])

    const handleNavigate = useCallback(() => {
        if (isProfileComplete) {
            navigation.replace('MainTab', { screen: 'Home' })
        } else {
            navigation.replace('CompleteProfile')
        }
    }, [isProfileComplete, navigation])

    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.container}>
                <View style={styles.topSection}>
                    <LottieView
                        source={require('@/assets/animations/welcome.json')}
                        autoPlay
                        loop
                        style={styles.banner}
                    />

                    <View style={styles.textContainer}>
                        <Text style={styles.heading}>Welcome, {userData?.first_name}</Text>
                        <Text style={styles.description}>
                            You are all set now, let’s reach your goals together with us
                        </Text>
                    </View>
                </View>

                <GradientButton containerStyle={styles.button} Square onPress={handleNavigate} isLoading={isNavigating}>
                    <Text style={styles.buttonText}>Go To Home</Text>
                </GradientButton>
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
        maxWidth: 214
    },
    heading: {
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 30,
        color: '#1D1617'
    },
    description: {
        marginTop: 5,
        fontSize: 13,
        fontWeight: '400',
        lineHeight: 18,
        textAlign: 'center',
        color: '#7B6F72'
    },
    banner: {
        width: 375,
        height: 350,
        flexShrink: 0
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

export default WelcomeScreen
