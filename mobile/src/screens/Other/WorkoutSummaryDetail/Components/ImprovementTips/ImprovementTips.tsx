// components/ImprovementTips.tsx
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import TextGradient from '@/components/TextGradient'

const ImprovementTips = () => {
    return (
        <View style={styles.card}>
            <View style={styles.tipContent}>
                <View style={styles.tipIcon}>
                    <FontAwesome5 name='dumbbell' size={20} color='#92A3FD' />
                </View>
                <View style={[styles.tipLine, { backgroundColor: '#9DCEFF' }]} />
                <Text style={styles.tipText}>Push yourself, because no one else is going to do it for you.</Text>
                <TouchableOpacity>
                    <TextGradient text='Get Started' style={styles.getStartedText} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        shadowColor: 'rgba(29, 22, 23, 0.1)',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 8
    },
    tipContent: { alignItems: 'center' },
    tipIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    tipLine: {
        width: 40,
        height: 2,
        marginBottom: 15
    },
    tipText: {
        fontSize: 13,
        color: '#7B6F72',
        textAlign: 'center',
        marginBottom: 15,
        lineHeight: 22
    },
    getStartedText: {
        fontSize: 16,
        fontWeight: '500'
    }
})

export default ImprovementTips
