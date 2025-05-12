import StorageManagerUtil from '@/utils/StorageManager.util'
import React, { createContext, useCallback, useState } from 'react'
import { Device } from 'react-native-ble-plx'
import { PeripheralType } from '@/types/peripheral.type'
import { readCharacteristic } from '@/utils/BLE.util'

interface BluetoothContextType {
    connectedDevice: Device | null
    setConnectedDevice: (connectedDevice: Device | null) => void
    peripheralInfo: PeripheralType | null
}

const initialContext: BluetoothContextType = {
    connectedDevice: null,
    setConnectedDevice: () => null,
    peripheralInfo: StorageManagerUtil.getPeripheral()
}

export const BluetoothContext = createContext<BluetoothContextType>(initialContext)

function BlueToothProvider({ children }: { children: React.ReactNode }) {
    const [connectedDevice, setConnectedDevice] = useState<Device | null>(initialContext.connectedDevice)
    const [DeviceInfo, setDeviceInfo] = useState<PeripheralType | null>(initialContext.peripheralInfo)

    const handleSetConnectedDevice = useCallback(async (device: Device | null) => {
        setConnectedDevice(device)
        if (!device) return
        const idDevice = await readCharacteristic(device)
        const deviceInfo: PeripheralType = {
            id: device.id,
            name: device.name || device.localName || 'Unknown',
            ip_address: idDevice || '',
            config: {
                mute: false
            }
        }

        setDeviceInfo(deviceInfo)
        await StorageManagerUtil.savePeripheral(deviceInfo)
    }, [])

    return (
        <BluetoothContext.Provider
            value={{
                connectedDevice,
                setConnectedDevice: handleSetConnectedDevice,
                peripheralInfo: DeviceInfo
            }}
        >
            {children}
        </BluetoothContext.Provider>
    )
}

export default BlueToothProvider
