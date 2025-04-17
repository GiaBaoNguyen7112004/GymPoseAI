import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import GradientButton from '@/components/GradientButton'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants/devices.constant'
import { RootStackScreenProps } from '@/navigation/types'
import { WorkoutBenefitsList } from '../Components/WorkoutBenefitsList'

export default function ConfirmYourGoal({ navigation }: RootStackScreenProps<'ConfirmYourGoal'>) {
    const handleConfirm = () => {
        navigation.replace('Login')
    }

    const renderHeader = () => (
        <View style={styles.header}>
            <Text style={styles.title}>What is your goal?</Text>
            <Text style={styles.subtitle}>It will help us to choose the best program for you</Text>
        </View>
    )

    const renderContent = () => (
        <View style={styles.content}>
            <WorkoutBenefitsList />
        </View>
    )

    const renderFooter = () => (
        <View style={styles.footer}>
            <GradientButton style={styles.button} onPress={handleConfirm}>
                <Text style={styles.buttonText}>Confirm</Text>
            </GradientButton>
        </View>
    )

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topSection}>
                {renderHeader()}
                {renderContent()}
            </View>
            {renderFooter()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'space-between',
        height: SCREEN_HEIGHT
    },
    topSection: {
        alignItems: 'center'
    },
    header: {
        marginTop: 20,
        alignItems: 'center',
        width: 195
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 30,
        color: '#1D1617',
        textAlign: 'center'
    },
    subtitle: {
        marginTop: 5,
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 18,
        color: '#7B6F72',
        textAlign: 'center'
    },
    content: {
        marginTop: 20
    },
    footer: {
        width: SCREEN_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 14
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        width: SCREEN_WIDTH * 0.9,
        marginTop: 7.5,
        shadowColor: 'rgba(149, 173, 254, 0.30)',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 22,
        elevation: 10
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 24
    }
})
