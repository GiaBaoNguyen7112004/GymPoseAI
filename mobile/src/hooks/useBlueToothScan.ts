// BlueToothScan/useBlueToothScan.ts
import { useCallback, useEffect, useState } from 'react'
import { Alert } from 'react-native'
import useBLE from '@/hooks/useBLE'
import useBluetoothContext from '@/hooks/useBluetoothContext'

export const useBlueToothScan = () => {
    const { peripheralInfo, setConnectedDevice, connectedDevice: contextDevice } = useBluetoothContext()
    const {
        allDevices,
        bleConnectedDevice,
        connectToDevice,
        requestPermissions,
        scanForPeripherals,
        isScanning,
        disconnectFromDevice
    } = useBLE({ connectedDeviceProps: contextDevice })

    const [isModalVisible, setIsModalVisible] = useState(false)

    const scanForDevices = useCallback(async () => {
        const isPermissionsEnabled = await requestPermissions()
        if (isPermissionsEnabled) {
            scanForPeripherals()
        } else {
            Alert.alert('Permission Required', 'Please grant Bluetooth permissions to continue.', [{ text: 'OK' }])
        }
    }, [])

    useEffect(() => {
        if (contextDevice?.id !== bleConnectedDevice?.id) {
            if (bleConnectedDevice) setConnectedDevice(bleConnectedDevice)
        }
    }, [bleConnectedDevice])

    const openModal = useCallback(async () => {
        await scanForDevices()
        setIsModalVisible(true)
    }, [])

    const hideModal = useCallback(() => setIsModalVisible(false), [])
    const handleDeviceDisconnect = useCallback(() => {
        disconnectFromDevice()
        setConnectedDevice(null)
    }, [])

    return {
        contextDevice,
        peripheralInfo,
        allDevices,
        connectToDevice,
        isModalVisible,
        isScanning,
        openModal,
        hideModal,
        handleDeviceDisconnect,
        scanForDevices
    }
}
