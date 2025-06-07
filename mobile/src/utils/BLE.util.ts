import peripheralConstants from '@/constants/peripheral.constants'
import { decodeBase64Value } from './decode.util'
import { Device } from 'react-native-ble-plx'

export const readAndMonitorCharacteristic = async (connectedDevice: Device, onData: (value: string) => void) => {
    try {
        const services = await connectedDevice.services()
        for (const service of services) {
            if (service.uuid.toLowerCase() === peripheralConstants.SERVICE_UUID.toLowerCase()) {
                const characteristics = await service.characteristics()
                for (const c of characteristics) {
                    if (c.uuid.toLowerCase() === peripheralConstants.CHARACTERISTIC_UUID.toLowerCase()) {
                        const data = await c.read()
                        if (data.value) {
                            const decoded = decodeBase64Value(data.value)
                            onData(decoded)
                        }

                        if (c.isNotifiable) {
                            c.monitor((error, char) => {
                                if (error) {
                                    console.error('Monitor error:', error)
                                    return
                                }
                                if (char?.value) {
                                    const decoded = decodeBase64Value(char.value)
                                    onData(decoded)
                                }
                            })
                        }

                        return
                    }
                }
            }
        }
    } catch (e) {
        console.error('Read/Monitor error:', e)
    }
}
