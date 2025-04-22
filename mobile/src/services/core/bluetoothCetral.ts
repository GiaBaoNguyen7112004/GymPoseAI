import { BleManager } from 'react-native-ble-plx'

class BLEService {
    instance: BleManager

    constructor() {
        this.instance = new BleManager()
    }
}

export const bleManager = new BLEService()
