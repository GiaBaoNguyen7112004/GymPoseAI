import React, { memo } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

type Props = {
    onClose: () => void
}

const ExerciseHeader = ({ onClose }: Props) => (
    <View style={styles.navBar}>
        <View style={styles.header}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Icon name='x' size={18} color='#333' />
            </TouchableOpacity>
        </View>
    </View>
)

export default memo(ExerciseHeader)

const styles = StyleSheet.create({
    navBar: {
        height: 60,
        justifyContent: 'center',
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: 'transparent'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 10
    },
    closeButton: {
        backgroundColor: '#F7F8F8',
        borderRadius: 8,
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
