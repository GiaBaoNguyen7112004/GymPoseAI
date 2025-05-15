import React, { memo } from 'react'
import { View, Text, StyleSheet, Pressable, Dimensions, Platform } from 'react-native'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

interface NoDeviceModalProps {
    isVisible: boolean
    onClose: () => void
    onConnectDevice: () => void
    title?: string
    message?: string
}

const { width } = Dimensions.get('window')

const NoDeviceModal = ({
    isVisible,
    onClose,
    onConnectDevice,
    title = 'No Device Connected',
    message = 'To start your workout, please connect to a compatible device.'
}: NoDeviceModalProps) => {
    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            onBackButtonPress={onClose}
            backdropOpacity={0.6}
            animationIn='zoomInUp'
            animationOut='zoomOutDown'
            animationInTiming={500}
            animationOutTiming={400}
            useNativeDriverForBackdrop
            style={styles.modal}
        >
            <View style={styles.container}>
                <Icon name='bluetooth-off' size={48} color='#FF6B6B' style={styles.icon} />

                <Text style={styles.title}>{title}</Text>
                <Text style={styles.message}>{message}</Text>

                <View style={styles.buttonContainer}>
                    <Pressable
                        style={({ pressed }) => [styles.button, styles.connectButton, pressed && styles.buttonPressed]}
                        onPress={onConnectDevice}
                        android_ripple={{ color: 'rgba(255,255,255,0.3)' }}
                    >
                        <Text style={[styles.buttonText, styles.connectButtonText]}>Connect Device</Text>
                    </Pressable>

                    <Pressable
                        style={({ pressed }) => [
                            styles.button,
                            styles.cancelButton,
                            pressed && styles.buttonPressedSecondary
                        ]}
                        onPress={onClose}
                        android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
                    >
                        <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancel</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        margin: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        paddingVertical: 30,
        paddingHorizontal: 25,
        alignItems: 'center',
        width: width * 0.85,
        maxWidth: 380,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 15,
        elevation: 10
    },
    icon: {
        marginBottom: 20
    },
    title: {
        fontSize: 22,
        fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
        color: '#1A202C',
        marginBottom: 12,
        textAlign: 'center'
    },
    message: {
        fontSize: 16,
        color: '#4A5568',
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 24
    },
    buttonContainer: {
        width: '100%'
    },
    button: {
        paddingVertical: 14,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    connectButton: {
        backgroundColor: '#4A90E2'
    },
    cancelButton: {
        backgroundColor: '#F0F2F5'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: Platform.OS === 'ios' ? '600' : 'bold'
    },
    connectButtonText: {
        color: '#FFFFFF'
    },
    cancelButtonText: {
        color: '#4A5568'
    },
    buttonPressed: {
        opacity: 0.8
    },
    buttonPressedSecondary: {
        backgroundColor: '#E2E8F0'
    }
})

export default memo(NoDeviceModal)
