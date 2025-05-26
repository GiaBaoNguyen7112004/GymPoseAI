import { BlurView } from 'expo-blur'
import React, { memo } from 'react'
import { View, Text, StyleSheet, Pressable, Dimensions, Platform } from 'react-native'
import Modal from 'react-native-modal'

interface NoDeviceModalProps {
    isVisible: boolean
    onClose: () => void
    onConnectDevice: () => void
    title?: string
    message?: string
}

const { width } = Dimensions.get('window')

const INSTAGRAM_COLORS = {
    primaryAction: '#0095F6',
    secondaryText: '#8e8e8e',
    textPrimary: '#262626',
    textSecondary: '#8e8e8e',
    separator: '#dbdbdb',
    background: '#FFFFFF'
}

const NoDeviceModal = ({
    isVisible,
    onClose,
    onConnectDevice,
    title = 'No Device Connected',
    message = 'Please connect a compatible device to start your workout.'
}: NoDeviceModalProps) => {
    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            onBackButtonPress={onClose}
            backdropOpacity={0.2}
            animationIn='fadeInUp'
            animationOut='fadeOutDown'
            animationInTiming={300}
            animationOutTiming={300}
            useNativeDriverForBackdrop
            style={styles.modal}
            hideModalContentWhileAnimating
        >
            <BlurView style={styles.blurContainer} tint='extraLight' intensity={0}>
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>

                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
                            onPress={onConnectDevice}
                            android_ripple={{ color: 'rgba(0, 149, 246, 0.1)' }}
                        >
                            <Text style={[styles.buttonText, styles.connectButtonText]}>Connect Device</Text>
                        </Pressable>

                        <View style={styles.separator} />

                        <Pressable
                            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
                            onPress={onClose}
                            android_ripple={{ color: 'rgba(0, 0, 0, 0.05)' }}
                        >
                            <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </BlurView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        margin: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    blurContainer: {
        borderRadius: 14,
        overflow: 'hidden',
        width: width * 0.75,
        maxWidth: 300
    },
    innerContainer: {
        paddingTop: 24,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.98)'
    },
    title: {
        fontSize: 18,
        fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
        color: INSTAGRAM_COLORS.textPrimary,
        marginBottom: 8,
        textAlign: 'center',
        paddingHorizontal: 20
    },
    message: {
        fontSize: 14,
        color: INSTAGRAM_COLORS.textSecondary,
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 20,
        paddingHorizontal: 20
    },
    buttonContainer: {
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: INSTAGRAM_COLORS.separator
    },
    button: {
        paddingVertical: 14,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 16,
        textAlign: 'center'
    },
    connectButtonText: {
        color: INSTAGRAM_COLORS.primaryAction,
        fontWeight: Platform.OS === 'ios' ? '600' : 'bold'
    },
    cancelButtonText: {
        color: INSTAGRAM_COLORS.secondaryText,
        fontWeight: Platform.OS === 'ios' ? '400' : 'normal'
    },
    separator: {
        height: 1,
        backgroundColor: INSTAGRAM_COLORS.separator,
        width: '100%'
    },
    buttonPressed: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)'
    }
})

export default memo(NoDeviceModal)
