import React, { memo } from 'react'
import { Keyboard } from 'react-native'
import { Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
interface CustomModalProps {
    visible: boolean
    children: React.ReactNode
}

function CustomModal({ children, visible }: CustomModalProps) {
    return (
        <Modal animationType='fade' transparent={true} visible={visible}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.centeredView}>{children}</View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default memo(CustomModal)

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
})
