import { BleManager, State } from 'react-native-ble-plx'

class BLEManager {
    private static instance: BleManager

    static getInstance(): BleManager {
        if (!BLEManager.instance) {
            BLEManager.instance = new BleManager()
        }
        return BLEManager.instance
    }

    static destroy() {
        if (BLEManager.instance) {
            BLEManager.instance.destroy()
            BLEManager.instance = undefined as any
        }
    }
    static getBluetoothState = async (): Promise<boolean> => {
        const manager = BLEManager.getInstance()
        const state = await manager.state()
        return state === State.PoweredOn
    }

    // Force disconnect all devices and clear cache
    static async forceDisconnectAll(): Promise<void> {
        try {
            const manager = BLEManager.getInstance()
            // Get all connected devices first
            const connectedDevices = await manager.connectedDevices([])

            // Disconnect each device
            for (const device of connectedDevices) {
                try {
                    await manager.cancelDeviceConnection(device.id)
                } catch (error) {
                    console.error(`Error disconnecting device ${device.id}:`, error)
                }
            }

            console.log('All BLE connections cancelled')
        } catch (error) {
            // console.error('Error force disconnecting all devices:', error)
        }
    }
}

export default BLEManager
