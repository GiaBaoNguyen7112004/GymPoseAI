import { pose_error } from '@/src/types/workoutHistory.type'
import { FontAwesome5 } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native'

interface ErrorStatItem {
    label: string
    count: number
}

function FormFeedBack({ pose_errors }: { pose_errors: pose_error[] }) {
    const errorStats = pose_errors.reduce<Record<string, number>>((acc, { ai_result }) => {
        acc[ai_result] = (acc[ai_result] || 0) + 1
        return acc
    }, {})

    const errorSummary: ErrorStatItem[] = Object.entries(errorStats).map(([label, count]) => ({ label, count }))

    return (
        <View>
            <Text style={styles.sectionTitle}>Form Feedback</Text>
            <View style={styles.card}>
                {errorSummary.length ? (
                    errorSummary.map(({ label, count }) => (
                        <View key={label} style={styles.item}>
                            <View style={styles.iconContainer}>
                                <FontAwesome5 name='exclamation-circle' size={20} color='#FF3B30' />
                            </View>
                            <Text style={styles.label}>{label}</Text>
                            <Text style={styles.value}>{count} times</Text>
                        </View>
                    ))
                ) : (
                    <View style={styles.successContainer}>
                        <FontAwesome5 name='check-circle' size={20} color='#4CD964' />
                        <Text style={styles.successText}>Great job! No form errors detected.</Text>
                    </View>
                )}
            </View>
        </View>
    )
}

export default FormFeedBack

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1D1617',
        marginBottom: 18
    },
    card: {
        gap: 12
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        shadowColor: 'rgba(29, 22, 23, 0.1)',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 40,
        elevation: 10
    },
    iconContainer: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    label: {
        flex: 1,
        fontSize: 16,
        color: '#1D1617'
    },
    value: {
        fontSize: 16,
        color: '#A4A9AD'
    },
    successContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    successText: {
        fontSize: 16,
        color: '#4CD964',
        marginLeft: 8
    }
})
