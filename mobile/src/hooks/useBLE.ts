import { useState, useRef, useCallback } from 'react'
import { BleManager, Device, Subscription as BleSubscription } from 'react-native-ble-plx'
import { Platform, PermissionsAndroid } from 'react-native'
import { set } from 'lodash'

const bleManager = new BleManager()

interface UseBLEProps {
    connectedDeviceProps: Device | null
}

const useBLE = ({ connectedDeviceProps }: UseBLEProps) => {
    const [allDevices, setAllDevices] = useState<Device[]>([])
    const [connectedDevice, setConnectedDevice] = useState<Device | null>(connectedDeviceProps)
    const [isScanning, setIsScanning] = useState(false)
    const [isDisconnecting, setIsDisconnecting] = useState(false)
    const [isConnecting, setIsConnecting] = useState(false)

    const monitorSubscription = useRef<BleSubscription | null>(null)

    const requestPermissions = useCallback(async (): Promise<boolean> => {
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
    }, [])

    const isDuplicateDevice = useCallback(
        (devices: Device[], nextDevice: Device) => devices.some((device) => device.id === nextDevice.id),
        []
    )

    const scanForPeripherals = useCallback(() => {
        setIsScanning(true)
        setAllDevices([])

        bleManager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                setIsScanning(false)
                return
            }

            if (device && (device.name == 'RaspberryPi' || device.localName == 'Raspberry Pi')) {
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
        }, 4000)
    }, [])

    const connectToDevice = useCallback(async (device: Device) => {
        try {
            setIsConnecting(true)
            const connected = await bleManager.connectToDevice(device.id, { timeout: 10000 })
            setConnectedDevice(connected)

            await connected.discoverAllServicesAndCharacteristics()
        } catch (e) {
            console.error('Connect error:', e)
        } finally {
            setIsConnecting(false)
        }
    }, [])

    const disconnectFromDevice = useCallback(async () => {
        try {
            if (connectedDevice) {
                setIsDisconnecting(true)
                await bleManager.cancelDeviceConnection(connectedDevice.id)
                monitorSubscription.current?.remove()
                setConnectedDevice(null)
            }
        } catch (e) {
            console.error('Disconnect error:', e)
        } finally {
            setIsDisconnecting(false)
        }
    }, [])

    return {
        scanForPeripherals,
        allDevices,
        bleConnectedDevice: connectedDevice,
        connectToDevice,
        disconnectFromDevice,
        isScanning,
        requestPermissions,
        isDisconnecting,
        isConnecting
    }
}

export default useBLE
