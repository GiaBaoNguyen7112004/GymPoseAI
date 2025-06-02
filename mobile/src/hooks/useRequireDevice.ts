import { useCallback, useState } from 'react'
import useBluetoothContext from './useBluetoothContext'
import { useNavigation } from '@react-navigation/native'

export default function useRequireDevice() {
    const { connectedDevice, peripheralInfo } = useBluetoothContext()
    const [isModalVisible, setModalVisible] = useState(false)
    const navigation = useNavigation()

    const isDeviceConnected = !!connectedDevice || !!peripheralInfo?.id

    const requireDevice = useCallback(
        (onSuccess: () => void) => {
            if (isDeviceConnected) {
                onSuccess()
            } else {
                setModalVisible(true)
            }
        },
        [isDeviceConnected]
    )

    const handleCloseModal = useCallback(() => {
        setModalVisible(false)
    }, [])

    const handleConnectDevice = useCallback(() => {
        setModalVisible(false)
        if (peripheralInfo?.id) {
            navigation.navigate('MyDevice')
        } else {
            navigation.navigate('BlueToothScan')
        }
    }, [peripheralInfo?.id, navigation])

    return {
        requireDevice,
        isModalVisible,
        handleCloseModal,
        handleConnectDevice
    }
}
