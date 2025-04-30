import React, { memo } from 'react'
import { Keyboard, ModalProps } from 'react-native'
import { Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
interface CustomModalProps extends ModalProps {
    visible: boolean
    children: React.ReactNode
}

function CustomModal({ children, visible, ...rest }: CustomModalProps) {
    return (
        <Modal animationType='fade' transparent={true} visible={visible} {...rest}>
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
