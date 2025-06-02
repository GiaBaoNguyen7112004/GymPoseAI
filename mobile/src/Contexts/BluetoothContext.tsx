import React, { createContext, useCallback, useState } from 'react'
import { Device } from 'react-native-ble-plx'
import { DeviceConfig, PeripheralType } from '@/types/peripheral.type'
import { readCharacteristic } from '@/utils/BLE.util'
import StorageManagerUtil from '@/utils/StorageManager.util'
import useBLE from '@/hooks/useBLE'
import BLEManager from '@/utils/BleManager'

interface BluetoothContextType {
    connectedDevice: Device | null
    peripheralInfo: PeripheralType | null
    configMyDevice: (config: DeviceConfig) => void
    tryConnectMyDevice: () => Promise<boolean>
    scanForDevices: () => Promise<Device[]>
    reReadInfoDevice: () => Promise<void>
    isConnecting: boolean
    isScanning: boolean
    isDisconnecting: boolean
    disconnectFromDevice: () => Promise<void>
    connectToDevice: (device: Device) => void
    allDevices: Device[]
    forceResetBLE: () => Promise<void>
}

const initialContext: BluetoothContextType = {
    connectedDevice: null,
    peripheralInfo: null,
    configMyDevice: () => null,
    tryConnectMyDevice: async () => Promise.resolve(false),
    scanForDevices: async () => [],
    reReadInfoDevice: async () => Promise.resolve(),
    isConnecting: false,
    isScanning: false,
    isDisconnecting: false,
    disconnectFromDevice: () => Promise.resolve(),
    connectToDevice: () => {},
    allDevices: [],
    forceResetBLE: () => Promise.resolve()
}

export const BluetoothContext = createContext<BluetoothContextType>(initialContext)

function BlueToothProvider({ children }: { children: React.ReactNode }) {
    const [deviceInfo, setDeviceInfo] = useState<PeripheralType | null>(StorageManagerUtil.getPeripheral())

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
            if (deviceInfo?.id === peripheral.id) {
                peripheral.config = { ...deviceInfo.config }
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
            // First disconnect from BLE device
            if (bleConnectedDevice) {
                await disconnectFromDevice()
            }

            // Clear all device info from state and storage
            setDeviceInfo(null)
            await StorageManagerUtil.savePeripheral(null)
        } catch (error) {
            // Force clear even if disconnect fails
            setDeviceInfo(null)
            await StorageManagerUtil.savePeripheral(null)
        }
    }, [bleConnectedDevice, disconnectFromDevice])

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

    const reReadInfoDevice = useCallback(async () => {
        if (bleConnectedDevice) {
            try {
                handleSetInfoConnectedDevice(bleConnectedDevice)
            } catch (error) {
                // console.error('Error re-reading device info:', error)
            }
        }
    }, [bleConnectedDevice])

    const forceResetBLE = useCallback(async () => {
        try {
            // Force disconnect all devices
            await BLEManager.forceDisconnectAll()

            // Clear all local state
            setDeviceInfo(null)

            // Clear storage
            await StorageManagerUtil.savePeripheral(null)

            // Destroy and recreate BLE manager instance
            BLEManager.destroy()

            console.log('BLE state completely reset')
        } catch (error) {
            // console.error('Error force resetting BLE:', error)
            // Still clear local state even if BLE operations fail
            setDeviceInfo(null)
            await StorageManagerUtil.savePeripheral(null)
        }
    }, [])

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
                isDisconnecting,
                reReadInfoDevice,
                forceResetBLE
            }}
        >
            {children}
        </BluetoothContext.Provider>
    )
}

export default BlueToothProvider
