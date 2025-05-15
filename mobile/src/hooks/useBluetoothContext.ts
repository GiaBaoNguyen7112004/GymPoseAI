import { BluetoothContext } from '@/Contexts/BluetoothContext'
import { useContext } from 'react'

const useBluetoothContext = () => {
    const context = useContext(BluetoothContext)
    if (context === undefined) {
        throw new Error('useBluetoothContext must be used within a BluetoothProvider')
    }
    return context
}

export default useBluetoothContext
