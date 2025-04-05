import GradientButton from '@/src/components/GradientButton'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/src/constants/Devices.constant'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { WorkoutBenefitsList } from './Components/WorkoutBenefitsList'

export default function RegisterStep3() {
    const handleConfirm = () => {}

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={styles.wrapperScreen}>
                <View style={styles.ContainerTop}>
                    <View style={styles.encouragementWrapper}>
                        <Text style={styles.encouragementQuestion}>What is your goal ?</Text>
                        <Text style={styles.encouragementAnswer}>It will help us to choose a best program for you</Text>
                    </View>
                    <View>
                        <WorkoutBenefitsList />
                    </View>
                </View>
                <View style={styles.ContainerBottom}>
                    <GradientButton style={[styles.btnWrapper]} onPress={handleConfirm}>
                        <Text style={styles.btnText}>Confirm</Text>
                    </GradientButton>
                </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapperScreen: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'space-between',
        height: SCREEN_HEIGHT
    },
    ContainerTop: {
        alignItems: 'center'
    },
    encouragementWrapper: {
        marginTop: 20,
        alignItems: 'center',
        width: 195
    },
    encouragementQuestion: {
        color: '#1D1617',
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 30,
        textAlign: 'center'
    },
    encouragementAnswer: {
        marginTop: 5,
        color: '#7B6F72',
        fontSize: 12,
        fontWeight: 400,
        lineHeight: 18,
        textAlign: 'center'
    },
    ContainerBottom: {
        width: SCREEN_WIDTH,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 7.5,
        width: SCREEN_WIDTH * 0.9,
        shadowColor: 'rgba(149, 173, 254, 0.30)',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 22,
        elevation: 10,
        marginBottom: 14
    },
    btnText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 24
    }
})
