import GradientButton from '@/components/GradientButton'
import { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface TodayTargetSectionProps {
    handleCheckTodayTarget: () => void
}

function TodayTargetSection({ handleCheckTodayTarget }: TodayTargetSectionProps) {
    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <Text style={styles.title}>Today Target</Text>
                <GradientButton Square style={styles.button} onPress={handleCheckTodayTarget}>
                    <Text style={styles.buttonText}>Check</Text>
                </GradientButton>
            </View>
        </View>
    )
}

export default memo(TodayTargetSection)

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 38,
        width: '90%'
    },
    container: {
        width: '100%',
        height: 57,
        borderRadius: 16,
        backgroundColor: '#EAF0FF',
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: 14,
        color: '#1D1617',
        fontWeight: '500'
    },
    button: {
        width: 68,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        position: 'absolute',
        fontSize: 12,
        fontWeight: '400',
        color: '#fff'
    }
})
