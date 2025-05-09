import { useEffect, useState, useRef, useContext } from 'react'
import { BleManager, Device, Subscription as BleSubscription } from 'react-native-ble-plx'
import { Platform, PermissionsAndroid } from 'react-native'
import base64 from 'react-native-base64'
import { AppContext } from '@/Contexts/App.context'

const SERVICE_UUID = '12345678-1234-5678-1234-56789abcdeff'
const CHARACTERISTIC_UUID = '12345678-1234-5678-1234-56789abcdef0'

const bleManager = new BleManager()

const useBLE = () => {
    const { setIpCamera } = useContext(AppContext)
    const [allDevices, setAllDevices] = useState<Device[]>([])
    const [connectedDevice, setConnectedDevice] = useState<Device | null>(null)
    const [responseMessage, setResponseMessage] = useState<string | undefined>(undefined)
    const [statusMessage, setStatusMessage] = useState<string>('Not connected')
    const [isScanning, setIsScanning] = useState(false)

    const monitorSubscription = useRef<BleSubscription | null>(null)

    const requestPermissions = async (): Promise<boolean> => {
        if (Platform.OS === 'android') {
            try {
                if (Platform.Version < 31) {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                    )
                    return granted === PermissionsAndroid.RESULTS.GRANTED
                } else {
                    const result = await PermissionsAndroid.requestMultiple([
                        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
                        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                    ])
                    return Object.values(result).every((r) => r === PermissionsAndroid.RESULTS.GRANTED)
                }
            } catch (e) {
                console.error('Permission error:', e)
                return false
            }
        }
        return true
    }

    const isDuplicateDevice = (devices: Device[], nextDevice: Device) =>
        devices.some((device) => device.id === nextDevice.id)

    const scanForPeripherals = () => {
        setStatusMessage('Scanning...')
        setIsScanning(true)
        setAllDevices([])

        bleManager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                setStatusMessage('Scan error: ' + error.message)
                setIsScanning(false)
                return
            }

            if (device && device.id && device.id === 'D8:3A:DD:E7:89:7C') {
                setAllDevices((prev) => {
                    if (!isDuplicateDevice(prev, device)) {
                        return [...prev, device]
                    }
                    return prev
                })
            }
        })

        setTimeout(() => {
            bleManager.stopDeviceScan()
            setIsScanning(false)
            setStatusMessage('Scan complete')
        }, 4000)
    }

    const connectToDevice = async (device: Device) => {
        try {
            setStatusMessage(`Connecting to ${device.name}...`)
            const connected = await bleManager.connectToDevice(device.id, { timeout: 10000 })
            setConnectedDevice(connected)
            setStatusMessage(`Connected to ${device.name}`)

            await connected.discoverAllServicesAndCharacteristics()
            await readInitialCharacteristic(connected)
        } catch (e) {
            console.error('Connect error:', e)
            setStatusMessage('Connection error')
        }
    }

    const readInitialCharacteristic = async (device: Device) => {
        try {
            const services = await device.services()
            for (const service of services) {
                if (service.uuid.toLowerCase() === SERVICE_UUID.toLowerCase()) {
                    const characteristics = await service.characteristics()
                    for (const c of characteristics) {
                        if (c.uuid.toLowerCase() === CHARACTERISTIC_UUID.toLowerCase()) {
                            const data = await c.read()
                            if (!data.value) return
                            const decodedValue = decodeBase64Value(data.value)
                            setIpCamera(decodedValue.trim())
                            setResponseMessage(decodedValue.trim())
                            setStatusMessage('Data read successfully')
                            return
                        }
                    }
                }
            }
            setStatusMessage('Matching characteristic not found')
        } catch (e) {
            console.error('Read error:', e)
            setStatusMessage('Read error')
        }
    }

    const decodeBase64Value = (base64Value: string) => {
        try {
            return base64.decode(base64Value || '') || 'unknown'
        } catch {
            return 'unknown'
        }
    }

    const disconnectFromDevice = async () => {
        try {
            if (connectedDevice) {
                await bleManager.cancelDeviceConnection(connectedDevice.id)
                monitorSubscription.current?.remove()
                setConnectedDevice(null)
                setResponseMessage('')
                setStatusMessage('Disconnected')
            }
        } catch (e) {
            console.error('Disconnect error:', e)
            setStatusMessage('Disconnection error')
        }
    }

    return {
        scanForPeripherals,
        allDevices,
        connectedDevice,
        connectToDevice,
        disconnectFromDevice,
        responseMessage,
        statusMessage,
        isScanning,
        requestPermissions
    }
}

export default useBLE
