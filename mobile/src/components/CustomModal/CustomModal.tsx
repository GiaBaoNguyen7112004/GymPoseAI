import React, { memo } from 'react'
import { Keyboard, ModalProps, StyleSheet, TouchableWithoutFeedback, View, Modal } from 'react-native'

interface CustomModalProps extends ModalProps {
    visible: boolean
    children: React.ReactNode
    onClose?: () => void
    overlayColor?: string
    dismissOnTouchOutside?: boolean
}

function CustomModal({
    children,
    visible,
    onClose,
    overlayColor = 'rgba(0, 0, 0, 0.5)',
    dismissOnTouchOutside = true,
    ...rest
}: CustomModalProps) {
    return (
        <Modal
            animationType='fade'
            transparent
            visible={visible}
            onRequestClose={onClose}
            statusBarTranslucent={true}
            {...rest}
        >
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss()
                    if (dismissOnTouchOutside) onClose?.()
                }}
            >
                <View style={[styles.overlay, { backgroundColor: overlayColor }]}>
                    <TouchableWithoutFeedback>
                        <View style={styles.contentWrapper}>{children}</View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default memo(CustomModal)

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentWrapper: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
