import React, { useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import LottieView from 'lottie-react-native'

import GradientButton from '@/components/GradientButton'
import { SCREEN_WIDTH } from '@/constants/devices.constant'
import { RootStackScreenProps } from '@/navigation/types'

const Congratulation = ({ navigation }: RootStackScreenProps<'Congratulation'>) => {
    const handleNavigate = useCallback(() => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'MainTab', params: { screen: 'Home' } }]
        })
    }, [])

    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.container}>
                <View style={styles.topSection}>
                    <LottieView
                        source={require('@/assets/animations/congratulations.json')}
                        autoPlay
                        loop
                        style={styles.banner}
                    />

                    <View style={styles.textContainer}>
                        <Text style={styles.heading}>Congratulations, You Have Finished Your Workout</Text>
                        <Text style={styles.description}>
                            Exercises is king and nutrition is queen. Combine the two and you will have a kingdom
                        </Text>
                    </View>
                </View>

                <GradientButton containerStyle={styles.button} Square onPress={handleNavigate}>
                    <Text style={styles.buttonText}>Back To Home</Text>
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
        maxWidth: '90%'
    },
    heading: {
        fontSize: 24,
        fontWeight: '700',
        lineHeight: 30,
        color: '#1D1617',
        textAlign: 'center'
    },
    description: {
        marginTop: 10,
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

export default Congratulation
