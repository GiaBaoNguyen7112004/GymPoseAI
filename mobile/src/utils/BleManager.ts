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
        BLEManager.instance?.destroy()
        BLEManager.instance = undefined as any
    }
    static getBluetoothState = async (): Promise<boolean> => {
        const manager = BLEManager.getInstance()
        const state = await manager.state()
        return state === State.PoweredOn
    }
}

export default BLEManager
