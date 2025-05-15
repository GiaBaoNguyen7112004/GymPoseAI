import peripheralConstants from '@/constants/peripheral.constants'
import { Device } from 'react-native-ble-plx'
import { decodeBase64Value } from './decode.util'

export const readCharacteristic = async (connectedDevice: Device) => {
    try {
        const services = await connectedDevice.services()
        for (const service of services) {
            if (service.uuid.toLowerCase() === peripheralConstants.SERVICE_UUID.toLowerCase()) {
                const characteristics = await service.characteristics()
                for (const c of characteristics) {
                    if (c.uuid.toLowerCase() === peripheralConstants.CHARACTERISTIC_UUID.toLowerCase()) {
                        const data = await c.read()
                        if (!data.value) return undefined
                        const decodedValue = decodeBase64Value(data.value)
                        return decodedValue
                    }
                }
            }
        }
    } catch (e) {
        console.error('Read error:', e)
    }
}
