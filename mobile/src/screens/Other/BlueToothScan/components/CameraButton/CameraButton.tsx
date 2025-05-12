import React, { memo } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { Entypo } from '@expo/vector-icons'

interface CameraButtonProps {
    onPress: () => void
}

const CameraButton = ({ onPress }: CameraButtonProps) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.button,
                {
                    opacity: pressed ? 0.7 : 1,
                    transform: [{ scale: pressed ? 0.98 : 1 }]
                }
            ]}
        >
            <Entypo name='camera' size={26} color='#FFFFFF' />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 22,
        backgroundColor: '#4A4A4A',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 2,
        elevation: 2,
        flexDirection: 'row',
        gap: 10
    }
})

export default memo(CameraButton)
