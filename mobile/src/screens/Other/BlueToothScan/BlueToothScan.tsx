import { useCallback, useState } from 'react'
import { Alert, SafeAreaView, StyleSheet, View } from 'react-native'
import LottieView from 'lottie-react-native'

import DeviceModal from '@/components/DeviceConnectionModal'
import useBluetoothContext from '@/hooks/useBluetoothContext'
import { RootStackScreenProps } from '@/navigation/types'

import ConnectButtonSection from './components/ConnectButtonSection/ConnectButtonSection'
import WarningSection from './components/WarningSection'
import ActionSection from './components/ActionSection'
import StatusSection from './components/StatusSection'
import HeaderSection from './components/HeaderSection'

const BlueToothScan = ({ navigation }: RootStackScreenProps<'BlueToothScan'>) => {
    const {
        connectedDevice,
        peripheralInfo,
        disconnectFromDevice,
        connectToDevice,
        allDevices,
        isConnecting,
        isDisconnecting,
        isScanning,
        scanForDevices
    } = useBluetoothContext()

    const isLoading = isDisconnecting || isConnecting || isScanning
    const [isModalVisible, setIsModalVisible] = useState(false)

    const openModal = useCallback(async () => {
        await scanForDevices()
        setIsModalVisible(true)
    }, [scanForDevices])

    const hideModal = useCallback(() => setIsModalVisible(false), [])

    const handleDevicePress = useCallback(() => navigation.navigate('MyDevice'), [navigation])

    return (
        <SafeAreaView style={styles.container}>
            <HeaderSection />

            <View style={styles.content}>
                <LottieView
                    source={require('@/assets/animations/loading_connection.json')}
                    autoPlay
                    loop
                    style={styles.animation}
                />

                <StatusSection contextDevice={connectedDevice} />

                {peripheralInfo?.ip_address && <ActionSection onPress={handleDevicePress} />}

                {!peripheralInfo?.ip_address && connectedDevice && <WarningSection />}
            </View>

            <ConnectButtonSection
                isScanning={isLoading}
                connected={!!connectedDevice}
                onConnect={openModal}
                onDisconnect={disconnectFromDevice}
            />

            <DeviceModal
                closeModal={hideModal}
                visible={isModalVisible}
                connectToPeripheral={connectToDevice}
                devices={allDevices || []}
                onRefresh={scanForDevices}
                isScanning={isScanning}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a'
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    animation: {
        width: 200,
        height: 200,
        marginBottom: 20
    }
})

export default BlueToothScan
