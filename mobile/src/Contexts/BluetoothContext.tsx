import React, { createContext, useCallback, useState } from 'react'
import { Device } from 'react-native-ble-plx'
import { DeviceConfig, PeripheralType } from '@/types/peripheral.type'
import { readCharacteristic } from '@/utils/BLE.util'
import StorageManagerUtil from '@/utils/StorageManager.util'
import useBLE from '@/hooks/useBLE'

interface BluetoothContextType {
    connectedDevice: Device | null
    peripheralInfo: PeripheralType | null
    configMyDevice: (config: DeviceConfig) => void
    tryConnectMyDevice: () => Promise<boolean>
    scanForDevices: () => Promise<Device[]>
    isConnecting: boolean
    isScanning: boolean
    isDisconnecting: boolean
    disconnectFromDevice: () => Promise<void>
    connectToDevice: (device: Device) => void
    allDevices: Device[]
}

const initialContext: BluetoothContextType = {
    connectedDevice: null,
    peripheralInfo: null,
    configMyDevice: () => null,
    tryConnectMyDevice: async () => Promise.resolve(false),
    scanForDevices: async () => [],
    isConnecting: false,
    isScanning: false,
    isDisconnecting: false,
    disconnectFromDevice: () => Promise.resolve(),
    connectToDevice: () => {},
    allDevices: []
}

export const BluetoothContext = createContext<BluetoothContextType>(initialContext)

function BlueToothProvider({ children }: { children: React.ReactNode }) {
    const [deviceInfo, setDeviceInfo] = useState<PeripheralType | null>(
        StorageManagerUtil.getPeripheral() || {
            id: '00:1A:7D:DA:71:13',
            name: 'Hello GymBot',
            ip_address: '192.168.34.160',
            config: { mute: false }
        }
    )

    const {
        connectToDeviceById,
        connectToDevice,
        disconnectFromDevice,
        allDevices,
        bleConnectedDevice,
        scanForDevices,
        isConnecting,
        isScanning,
        isDisconnecting
    } = useBLE({
        connectedDeviceProps: null
    })

    const handleSetInfoConnectedDevice = useCallback(async (device: Device) => {
        try {
            const idDevice = await readCharacteristic(device)
            const peripheral: PeripheralType = {
                id: device.id,
                name: device.name || device.localName || 'Unknown',
                ip_address: idDevice || '',
                config: { mute: false }
            }

            setDeviceInfo(peripheral)
            await StorageManagerUtil.savePeripheral(peripheral)
        } catch (error) {
            console.error('Error reading device info:', error)
        }
    }, [])

    const configMyDevice = async (config: DeviceConfig) => {
        if (!deviceInfo?.id) return

        const updatedPeripheral: PeripheralType = {
            ...deviceInfo,
            config: {
                ...deviceInfo.config,
                ...config
            }
        }
        console.log('Updated Peripheral:', updatedPeripheral)
        setDeviceInfo(updatedPeripheral)
        await StorageManagerUtil.savePeripheral(updatedPeripheral)
    }

    const tryConnectMyDevice = useCallback(async () => {
        if (!deviceInfo?.id) return true
        try {
            let matchedDevice = allDevices.find((d) => d.id === deviceInfo.id)

            if (!matchedDevice) {
                const scannedDevices = await scanForDevices()
                matchedDevice = scannedDevices.find((d) => d.id === deviceInfo.id)
            }

            if (matchedDevice) {
                const connectedDevice = await connectToDeviceById(matchedDevice.id)
                if (connectedDevice) {
                    await handleSetInfoConnectedDevice(connectedDevice)
                    return true
                }
            }

            console.warn('Device not found or failed to connect.')
            return false
        } catch (err) {
            console.error('Auto reconnect failed:', err)
            return true
        }
    }, [deviceInfo?.id, allDevices, scanForDevices, connectToDeviceById, handleSetInfoConnectedDevice])

    const handleDisconnect = useCallback(async () => {
        try {
            if (bleConnectedDevice) {
                await disconnectFromDevice()
            }

            setDeviceInfo(null)
            StorageManagerUtil.savePeripheral(null)
        } catch (error) {
            console.error('Error disconnecting from device:', error)
        }
    }, [disconnectFromDevice])

    const handleConnectToDevice = useCallback(
        async (device: Device) => {
            try {
                const connectedDevice = await connectToDevice(device)
                if (connectedDevice) {
                    await handleSetInfoConnectedDevice(connectedDevice)
                }
            } catch (error) {
                console.error('Error connecting to device:', error)
            }
        },
        [connectToDevice, handleSetInfoConnectedDevice]
    )

    return (
        <BluetoothContext.Provider
            value={{
                connectedDevice: bleConnectedDevice,
                peripheralInfo: deviceInfo,
                configMyDevice,
                tryConnectMyDevice,
                scanForDevices,
                allDevices,
                connectToDevice: handleConnectToDevice,
                disconnectFromDevice: handleDisconnect,
                isConnecting,
                isScanning,
                isDisconnecting
            }}
        >
            {children}
        </BluetoothContext.Provider>
    )
}

export default BlueToothProvider
