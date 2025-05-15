import { Text, StyleSheet } from 'react-native'
import GradientButton from '@/components/GradientButton'
import { memo } from 'react'

const ConnectButtonSection = ({
    connected,
    onConnect,
    onDisconnect,
    isScanning
}: {
    connected: boolean
    onConnect: () => void
    onDisconnect: () => void
    isScanning: boolean
}) => (
    <GradientButton
        onPress={connected ? onDisconnect : onConnect}
        containerStyle={styles.connectButton}
        isLoading={isScanning}
        Square
    >
        <Text style={styles.connectButtonText}>{connected ? 'Disconnect' : 'Connect Device'}</Text>
    </GradientButton>
)

const styles = StyleSheet.create({
    connectButton: {
        width: '90%',
        alignSelf: 'center',
        marginBottom: 50
    },
    connectButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#ffffff',
        textAlign: 'center'
    }
})

export default memo(ConnectButtonSection)
