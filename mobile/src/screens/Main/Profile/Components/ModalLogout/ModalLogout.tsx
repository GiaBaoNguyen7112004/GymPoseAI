import CustomModal from '@/components/CustomModal'
import { SCREEN_WIDTH } from '@/constants/devices.constant'
import { AppContext } from '@/Contexts/App.context'
import { authApi } from '@/services/rest'
import { showErrorAlert } from '@/utils/alert.util'
import { useMutation } from '@tanstack/react-query'
import { memo, useContext } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

interface ModalLogoutProps {
    isLogoutModalVisible: boolean
    toggleModal: (value: boolean) => void
    isLoggingOut: boolean
    setIsLoggingOut: (value: boolean) => void
}

function ModalLogout({ toggleModal, isLogoutModalVisible, isLoggingOut, setIsLoggingOut }: ModalLogoutProps) {
    const { setAuthenticated } = useContext(AppContext)
    const { mutateAsync: logout } = useMutation({ mutationFn: authApi.logout })

    const handleLogout = async () => {
        if (isLoggingOut) return

        toggleModal(false)
        setIsLoggingOut(true)

        try {
            await logout()
            setAuthenticated(false)
        } catch {
            showErrorAlert('default')
        } finally {
            setIsLoggingOut(false)
        }
    }

    return (
        <CustomModal visible={isLogoutModalVisible} onRequestClose={() => toggleModal(false)}>
            <View style={styles.container}>
                <Text style={styles.title}>Are you sure you want to log out?</Text>
                <View style={styles.buttonGroup}>
                    <Pressable
                        style={[styles.button, styles.cancelButton]}
                        onPress={() => toggleModal(false)}
                        disabled={isLoggingOut}
                    >
                        <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancel</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, styles.confirmButton]}
                        onPress={handleLogout}
                        disabled={isLoggingOut}
                    >
                        <Text style={styles.buttonText}>Confirm</Text>
                    </Pressable>
                </View>
            </View>
        </CustomModal>
    )
}

export default memo(ModalLogout)

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        width: SCREEN_WIDTH * 0.8
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1D1617',
        marginBottom: 20,
        textAlign: 'center'
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 10,
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1D1617'
    },
    cancelButton: {
        backgroundColor: '#007AFF'
    },
    cancelButtonText: {
        color: '#FFF'
    },
    confirmButton: {
        backgroundColor: '#F0F0F0'
    }
})
