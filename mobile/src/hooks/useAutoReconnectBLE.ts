import { useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import useBluetoothContext from './useBluetoothContext'
import BLEManager from '@/utils/BleManager'
import showToast from '@/utils/toast.util'

export default function useAutoReconnectBLE(mode: 'infinite' | 'once' = 'infinite') {
    const { tryConnectMyDevice, peripheralInfo } = useBluetoothContext()

    useFocusEffect(
        useCallback(() => {
            let isCancelled = false
            let retryInterval: NodeJS.Timeout | null = null

            const connect = async () => {
                const isBluetoothOn = await BLEManager.getBluetoothState()
                if (!isBluetoothOn) {
                    showToast({
                        title: 'Bluetooth is Off',
                        subtitle: 'Please enable Bluetooth to connect your device.'
                    })
                    return
                }

                if (!peripheralInfo?.id || isCancelled) return

                const isConnected = await tryConnectMyDevice()

                if (isConnected && retryInterval) {
                    clearInterval(retryInterval)
                    retryInterval = null
                }
            }

            if (mode === 'infinite') {
                connect()
                retryInterval = setInterval(() => {
                    if (!isCancelled) {
                        connect()
                    }
                }, 5000)
            } else {
                connect()
            }

            return () => {
                isCancelled = true
                if (retryInterval) clearInterval(retryInterval)
            }
        }, [mode, peripheralInfo?.id])
    )
}
