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
        if (isHasCamera) {
            navigation.navigate('MyDevice')
        } else {
            navigation.navigate('BlueToothScan')
        }
    }, [isHasCamera, navigation])

    return (
        <TouchableOpacity style={styles.button} onPress={handlePress}>
            {isHasCamera ? (
                <MaterialIcons name='photo-camera' size={22} color='#000' />
            ) : (
                <MaterialIcons name='add' size={22} color='#000' />
            )}
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
        alignItems: 'center',
        position: 'relative'
    },
    badge: {
        position: 'absolute',
        top: 1,
        right: 1,
        backgroundColor: 'red',
        borderRadius: 10,
        paddingHorizontal: 4,
        minWidth: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F7F8F8'
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold'
    }
})

export default memo(CameraInfoButton)
