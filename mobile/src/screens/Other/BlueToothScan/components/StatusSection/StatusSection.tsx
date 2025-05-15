import { memo } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const StatusSection = ({ contextDevice }: { contextDevice: any }) => (
    <View style={styles.statusContainer}>
        <Icon
            name={contextDevice ? 'check-circle' : 'bluetooth-off'}
            size={40}
            color={contextDevice ? '#22c55e' : '#ef4444'}
            style={styles.statusIcon}
        />
        <Text style={styles.statusText}>{contextDevice ? 'Camera Ready!' : 'No Device Connected'}</Text>
    </View>
)

const styles = StyleSheet.create({
    statusContainer: {
        alignItems: 'center',
        marginBottom: 20
    },
    statusIcon: {
        marginBottom: 10
    },
    statusText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#ffffff',
        textAlign: 'center'
    }
})

export default memo(StatusSection)
