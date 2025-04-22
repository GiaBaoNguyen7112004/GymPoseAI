import { useState } from 'react'
import { PermissionsAndroid, Platform } from 'react-native'
import * as DeviceInfo from 'expo-device'
import * as base64 from 'react-native-base64'
import { BleError, BleManager, Characteristic, Device } from 'react-native-ble-plx'

const bleManager = new BleManager()

const DATA_SERVICE_UUID = '19b10000-e8f2-537e-4f6c-d104768a1214'
const COLOR_CHARACTERISTIC_UUID = '19b10001-e8f2-537e-4f6c-d104768a1217'

function useBLE() {
    const [allDevices, setAllDevices] = useState<Device[]>([])
    const [connectedDevice, setConnectedDevice] = useState<Device | null>(null)
    const [color, setColor] = useState('white')

    const requestAndroid31Permissions = async () => {
        const permissions = [
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        ]

        const results = await Promise.all(
            permissions.map((permission) =>
                PermissionsAndroid.request(permission, {
                    title: 'Bluetooth Permission',
                    message: 'Bluetooth Low Energy requires Location',
                    buttonPositive: 'OK'
                })
            )
        )

        return results.every((result) => result === PermissionsAndroid.RESULTS.GRANTED)
    }

    const requestPermissions = async () => {
        if (Platform.OS !== 'android') return true

        const apiLevel = DeviceInfo.platformApiLevel ?? -1
        if (apiLevel < 31) {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                title: 'Location Permission',
                message: 'Bluetooth Low Energy requires Location',
                buttonPositive: 'OK'
            })
            return granted === PermissionsAndroid.RESULTS.GRANTED
        }

        return await requestAndroid31Permissions()
    }

    const isDuplicateDevice = (devices: Device[], nextDevice: Device) =>
        devices.some((device) => device.id === nextDevice.id)

    const scanForPeripherals = () => {
        bleManager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                console.log('Scan error:', error)
                return
            }

            if (device && (device.name === 'Arduino' || device.localName === 'Arduino')) {
                setAllDevices((prevDevices) =>
                    isDuplicateDevice(prevDevices, device) ? prevDevices : [...prevDevices, device]
                )
            }
        })
    }

    const connectToDevice = async (device: Device) => {
        try {
            const connected = await bleManager.connectToDevice(device.id)
            await connected.discoverAllServicesAndCharacteristics()
            bleManager.stopDeviceScan()

            setConnectedDevice(connected)
            startStreamingData(connected)
        } catch (error) {
            console.log('Connection failed:', error)
        }
    }

    const decodeColorFromCharacteristic = (value: string) => {
        const colorCode = base64.decode(value)
        switch (colorCode) {
            case 'B':
                return 'blue'
            case 'R':
                return 'red'
            case 'G':
                return 'green'
            default:
                return 'white'
        }
    }

    const onDataUpdate = (error: BleError | null, characteristic: Characteristic | null) => {
        if (error) {
            console.log('Data update error:', error)
            return
        }

        if (!characteristic?.value) {
            console.log('Empty characteristic value')
            return
        }

        const receivedColor = decodeColorFromCharacteristic(characteristic.value)
        setColor(receivedColor)
    }

    const startStreamingData = async (device: Device) => {
        if (!device) {
            console.log('No device to stream from')
            return
        }

        device.monitorCharacteristicForService(DATA_SERVICE_UUID, COLOR_CHARACTERISTIC_UUID, onDataUpdate)
    }

    return {
        allDevices,
        connectedDevice,
        color,
        requestPermissions,
        scanForPeripherals,
        connectToDevice,
        startStreamingData
    }
}

export default useBLE
