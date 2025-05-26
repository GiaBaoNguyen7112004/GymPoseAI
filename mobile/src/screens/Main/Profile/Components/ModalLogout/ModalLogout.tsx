import useAppContext from '@/hooks/useAppContext'
import useNotification from '@/hooks/useNotificationContext'
import { authApi } from '@/services/rest'
import { showErrorAlert } from '@/utils/alert.util'
import { useMutation } from '@tanstack/react-query'
import { memo, useCallback } from 'react'
import { Pressable, StyleSheet, Text, View, Dimensions, Platform } from 'react-native'
import Modal from 'react-native-modal'
import { BlurView } from 'expo-blur'

interface ModalLogoutProps {
    isLogoutModalVisible: boolean
    toggleModal: (value: boolean) => void
    isLoggingOut: boolean
    setIsLoggingOut: (value: boolean) => void
}

const { width } = Dimensions.get('window')

const ModalLogout = ({ toggleModal, isLogoutModalVisible, isLoggingOut, setIsLoggingOut }: ModalLogoutProps) => {
    const { setAuthenticated } = useAppContext()
    const { setAllowNotification } = useNotification()
    const { mutateAsync: logout } = useMutation({ mutationFn: authApi.logout })

    const handleLogout = useCallback(async () => {
        if (isLoggingOut) return

        toggleModal(false)
        setIsLoggingOut(true)

        try {
            setAllowNotification(false, false)
            await logout()
            setAuthenticated(false)
        } catch {
            showErrorAlert({ statusCode: 'default' })
        } finally {
            setIsLoggingOut(false)
        }
    }, [isLoggingOut, logout, setAuthenticated, toggleModal, setIsLoggingOut, setAllowNotification])

    const handleCancel = useCallback(() => {
        if (isLoggingOut) return
        toggleModal(false)
    }, [isLoggingOut, toggleModal])

    return (
        <Modal
            isVisible={isLogoutModalVisible}
            onBackdropPress={handleCancel}
            onBackButtonPress={handleCancel}
            backdropOpacity={0.2}
            animationIn='fadeInUp'
            animationOut='fadeOutDown'
            animationInTiming={300}
            animationOutTiming={300}
            style={styles.modal}
            hideModalContentWhileAnimating
        >
            <BlurView style={styles.blurContainer} tint='extraLight' intensity={0}>
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>Log Out of Your Account?</Text>

                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
                            onPress={handleLogout}
                            disabled={isLoggingOut}
                            android_ripple={{ color: 'rgba(237, 73, 86, 0.1)' }}
                        >
                            <Text style={[styles.buttonText, styles.logoutButtonText]}>Log Out</Text>
                        </Pressable>

                        <View style={styles.separator} />

                        <Pressable
                            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
                            onPress={handleCancel}
                            disabled={isLoggingOut}
                            android_ripple={{ color: 'rgba(0, 0, 0, 0.05)' }}
                        >
                            <Text style={styles.buttonText}>Cancel</Text>
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
        paddingTop: 16,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.98)'
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 16,
        textAlign: 'center',
        paddingHorizontal: 20,
        paddingVertical: 2
    },
    buttonContainer: {
        width: '100%',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#dbdbdb'
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
    logoutButtonText: {
        color: '#ED4956',
        fontWeight: Platform.OS === 'ios' ? '600' : 'bold'
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#dbdbdb',
        width: '100%'
    },
    buttonPressed: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)'
    }
})

export default memo(ModalLogout)
