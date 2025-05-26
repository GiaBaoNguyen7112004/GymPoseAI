import { StyleSheet, TouchableOpacity } from 'react-native'
import { memo, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import useBluetoothContext from '@/hooks/useBluetoothContext'
import { MaterialIcons } from '@expo/vector-icons'

function CameraInfoButton() {
    const { peripheralInfo } = useBluetoothContext()
    const navigation = useNavigation()
    const isHasCamera = Boolean(peripheralInfo?.id)

    const handlePress = useCallback(() => {
        navigation.navigate(isHasCamera ? 'MyDevice' : 'BlueToothScan')
    }, [isHasCamera, navigation])

    const iconName = isHasCamera ? 'photo-camera' : 'add'

    return (
        <TouchableOpacity style={styles.button} onPress={handlePress}>
            <MaterialIcons name={iconName} size={22} color='#000' />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 40,
        height: 40,
        backgroundColor: '#F7F8F8',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default memo(CameraInfoButton)
