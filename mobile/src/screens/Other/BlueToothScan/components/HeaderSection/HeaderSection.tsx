import { View, Text, StyleSheet } from 'react-native'

const HeaderSection = () => (
    <View style={styles.header}>
        <Text style={styles.headerTitle}>Connect Your Gear</Text>
        <Text style={styles.headerSubtitle}>Sync your camera to track your workout like a pro!</Text>
    </View>
)

const styles = StyleSheet.create({
    header: {
        padding: 20,
        backgroundColor: '#1e293b',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 8
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#94a3b8',
        textAlign: 'center',
        maxWidth: '80%'
    }
})

export default HeaderSection
