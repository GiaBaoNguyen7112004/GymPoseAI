import { useCallback, useEffect, useState } from 'react'
import { Alert, SafeAreaView, StyleSheet, View } from 'react-native'
import LottieView from 'lottie-react-native'

import DeviceModal from '@/components/DeviceConnectionModal'

import useBLE from '@/hooks/useBLE'
import useBluetoothContext from '@/hooks/useBluetoothContext'
import { RootStackScreenProps } from '@/navigation/types'
import ConnectButtonSection from './components/ConnectButtonSection/ConnectButtonSection'
import WarningSection from './components/WarningSection'
import ActionSection from './components/ActionSection'
import StatusSection from './components/StatusSection'
import HeaderSection from './components/HeaderSection'

const BlueToothScan = ({ navigation }: RootStackScreenProps<'BlueToothScan'>) => {
    const { peripheralInfo, setConnectedDevice, connectedDevice: contextDevice } = useBluetoothContext()
    const {
        allDevices,
        bleConnectedDevice,
        connectToDevice,
        requestPermissions,
        scanForPeripherals,
        isScanning,
        isDisconnecting,
        isConnecting,
        disconnectFromDevice
    } = useBLE({ connectedDeviceProps: contextDevice })

    const isLoading = isDisconnecting || isConnecting || isScanning

    const [isModalVisible, setIsModalVisible] = useState(false)

    useEffect(() => {
        if (contextDevice?.id !== bleConnectedDevice?.id && bleConnectedDevice) {
            setConnectedDevice(bleConnectedDevice)
        }
    }, [bleConnectedDevice])

    const scanForDevices = useCallback(async () => {
        const granted = await requestPermissions()
        if (granted) {
            scanForPeripherals()
        } else {
            Alert.alert('Permission Required', 'Please grant Bluetooth permissions to continue.')
        }
    }, [])

    const openModal = useCallback(async () => {
        await scanForDevices()
        setIsModalVisible(true)
    }, [scanForDevices])

    const hideModal = useCallback(() => setIsModalVisible(false), [])

    const handleDevicePress = useCallback(() => navigation.navigate('MyDevice'), [])
    const handleDisconnect = useCallback(() => {
        disconnectFromDevice()
        setConnectedDevice(null)
    }, [])

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

                <StatusSection contextDevice={contextDevice} />

                {peripheralInfo?.ip_address && <ActionSection onPress={handleDevicePress} />}

                {!peripheralInfo?.ip_address && contextDevice && <WarningSection />}
            </View>

            <ConnectButtonSection
                isScanning={isLoading}
                connected={!!contextDevice}
                onConnect={openModal}
                onDisconnect={handleDisconnect}
            />

            <DeviceModal
                closeModal={hideModal}
                visible={isModalVisible}
                connectToPeripheral={connectToDevice}
                devices={allDevices}
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
