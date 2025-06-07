import { useCallback, useRef } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import useBluetoothContext from './useBluetoothContext'
import BLEManager from '@/utils/BleManager'
import showToast from '@/utils/toast.util'

export default function useAutoReconnectBLE(mode: 'infinite' | 'once' = 'infinite') {
    const { tryConnectMyDevice, peripheralInfo, connectedDevice } = useBluetoothContext()
    const retryInterval = useRef<NodeJS.Timeout | null>(null)

    const clearRetryInterval = useCallback(() => {
        if (retryInterval.current) {
            clearInterval(retryInterval.current)
            retryInterval.current = null
        }
    }, [])

    const connect = useCallback(async () => {
        const isBluetoothOn = await BLEManager.getBluetoothState()
        if (!isBluetoothOn) {
            showToast({
                title: 'Bluetooth is Off',
                subtitle: 'Please enable Bluetooth to connect your device.'
            })
            return
        }

        if (!peripheralInfo?.id || connectedDevice) return

        const isConnected = await tryConnectMyDevice()

        if (isConnected || connectedDevice) {
            clearRetryInterval()
        }
    }, [peripheralInfo?.id, connectedDevice, tryConnectMyDevice])

    useFocusEffect(
        useCallback(() => {
            let isCancelled = false

            if (mode === 'infinite') {
                connect()
                retryInterval.current = setInterval(() => {
                    if (!isCancelled) {
                        connect()
                    }
                }, 5000)
            } else {
                connect()
            }

            return () => {
                isCancelled = true
                clearRetryInterval()
            }
        }, [mode, peripheralInfo?.id])
    )
}
