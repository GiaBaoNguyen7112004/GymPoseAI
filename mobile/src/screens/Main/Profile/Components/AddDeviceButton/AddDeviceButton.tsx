import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useCallback } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

interface AddDeviceButtonProps {
    onPress?: () => void
}

function AddDeviceButton({ onPress }: AddDeviceButtonProps) {
    return (
        <TouchableOpacity style={styles.addDeviceButton} onPress={onPress}>
            <MaterialIcons name='add' size={16} color='#1D1617' />
            <Text style={styles.textInnerAddDevice}>Add device</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    addDeviceButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        paddingTop: 10
    },
    textInnerAddDevice: {
        marginLeft: 4,
        color: '#1D1617',
        fontSize: 14
    }
})

export default AddDeviceButton
