import { useState, useRef, useCallback } from 'react'
import { Device, Subscription as BleSubscription } from 'react-native-ble-plx'
import { Platform, PermissionsAndroid, Alert } from 'react-native'
import { BLE_CONFIG } from '@/constants/ble.constants'
import BLEManager from '@/utils/BleManager'

const bleManager = BLEManager.getInstance()

interface UseBLEProps {
    connectedDeviceProps: Device | null
}

const useBLE = ({ connectedDeviceProps }: UseBLEProps) => {
    const [allDevices, setAllDevices] = useState<Device[]>([])
    const [connectedDevice, setConnectedDevice] = useState<Device | null>(connectedDeviceProps)

    const [isScanning, setIsScanning] = useState(false)
    const [isConnecting, setIsConnecting] = useState(false)
    const [isDisconnecting, setIsDisconnecting] = useState(false)

    const monitorSubscription = useRef<BleSubscription | null>(null)

    const requestPermissions = useCallback(async (): Promise<boolean> => {
        if (Platform.OS !== 'android') return true

        try {
            if (Platform.Version < 31) {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
                return granted === PermissionsAndroid.RESULTS.GRANTED
            }

            const permissions = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
                PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            ])

            return Object.values(permissions).every((result) => result === PermissionsAndroid.RESULTS.GRANTED)
        } catch (error) {
            // console.error('Permission error:', error)
            return false
        }
    }, [])

    const isDuplicateDevice = useCallback(
        (devices: Device[], nextDevice: Device) => devices.some((device) => device.id === nextDevice.id),
        []
    )

    const isTargetDevice = useCallback((device: Device): boolean => {
        const name = device.name ?? ''
        const localName = device.localName ?? ''
        return BLE_CONFIG.TARGET_DEVICE_NAMES.some((target) => name.includes(target) || localName.includes(target))
    }, [])

    const scanForDevices = useCallback(async (): Promise<Device[]> => {
        const granted = await requestPermissions()
        if (!granted) {
            Alert.alert('Permission Required', 'Please grant Bluetooth permissions to continue.')
            return []
        }

        return new Promise((resolve) => {
            const discoveredDevices: Device[] = []
            setIsScanning(true)
            setAllDevices([])

            bleManager.startDeviceScan(null, null, (error, device) => {
                if (error) {
                    bleManager.stopDeviceScan()
                    setIsScanning(false)
                    resolve(discoveredDevices)
                    return
                }

                if (device && isTargetDevice(device)) {
                    const alreadyFound = discoveredDevices.find((d) => d.id === device.id)
                    if (!alreadyFound) {
                        discoveredDevices.push(device)
                        setAllDevices((prevState: Device[]) => {
                            if (!isDuplicateDevice(prevState, device)) {
                                return [...prevState, device]
                            }
                            return prevState
                        })
                    }
                }
            })

            setTimeout(() => {
                bleManager.stopDeviceScan()
                setIsScanning(false)
                resolve(discoveredDevices)
            }, BLE_CONFIG.SCAN_DURATION)
        })
    }, [requestPermissions, isDuplicateDevice])

    const connectToDevice = useCallback(async (device: Device) => connectToDeviceById(device.id), [])

    const connectToDeviceById = useCallback(async (deviceId: string): Promise<Device | null> => {
        try {
            setIsConnecting(true)

            const device = await bleManager.connectToDevice(deviceId, { timeout: 10000 })
            const isConnected = await device?.isConnected()

            if (!isConnected) {
                throw new Error('Device disconnected right after connect')
            }

            await device.discoverAllServicesAndCharacteristics()
            setConnectedDevice(device)

            monitorSubscription.current = device.onDisconnected((error, disconnectedDevice) => {
                console.log('Device disconnected:', disconnectedDevice.id, error)
                setConnectedDevice(null)
                setIsConnecting(false)
                monitorSubscription.current?.remove()
            })

            return device
        } catch (error) {
            return null
        } finally {
            setIsConnecting(false)
        }
    }, [])

    const disconnectFromDevice = useCallback(async () => {
        if (!connectedDevice) return

        try {
            setIsDisconnecting(true)

            // Remove the monitor subscription first
            if (monitorSubscription.current) {
                monitorSubscription.current.remove()
                monitorSubscription.current = null
            }

            // Set a timeout for disconnect operation (5 seconds)
            const disconnectPromise = (async () => {
                // Check if device is still connected before attempting to disconnect
                const isConnected = await connectedDevice.isConnected()
                if (isConnected) {
                    await bleManager.cancelDeviceConnection(connectedDevice.id)
                }

                // Force disconnect all to ensure clean state
                await BLEManager.forceDisconnectAll()
            })()

            // Race between disconnect and timeout
            await Promise.race([
                disconnectPromise,
                new Promise((_, reject) => setTimeout(() => reject(new Error('Disconnect timeout')), 5000))
            ])

            // Clear the connected device state
            setConnectedDevice(null)

            console.log('Device disconnected successfully')
        } catch (error) {
            // Even if there's an error, clear the device state
            setConnectedDevice(null)
            if (monitorSubscription.current) {
                monitorSubscription.current.remove()
                monitorSubscription.current = null
            }
        } finally {
            setIsDisconnecting(false)
        }
    }, [connectedDevice])

    return {
        allDevices,
        bleConnectedDevice: connectedDevice,
        scanForDevices,
        connectToDevice,
        connectToDeviceById,
        disconnectFromDevice,
        isScanning,
        isConnecting,
        isDisconnecting
    }
}

export default useBLE
