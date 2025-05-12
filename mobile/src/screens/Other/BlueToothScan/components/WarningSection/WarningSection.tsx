import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const WarningSection = () => (
    <View style={styles.warningContainer}>
        <Icon name='alert-circle' size={20} color='#b91c1c' />
        <Text style={styles.warningText}>Connection Issue: No IP found. Try reconnecting.</Text>
    </View>
)

const styles = StyleSheet.create({
    warningContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fee2e2',
        padding: 12,
        borderRadius: 12,
        marginTop: 20
    },
    warningText: {
        color: '#b91c1c',
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 8
    }
})

export default WarningSection
