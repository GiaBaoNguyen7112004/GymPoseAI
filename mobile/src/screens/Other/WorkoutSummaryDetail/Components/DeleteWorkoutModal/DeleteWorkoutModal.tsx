import { BlurView } from 'expo-blur'
import React, { memo, useCallback } from 'react'
import { View, Text, StyleSheet, Pressable, Dimensions, Platform } from 'react-native'
import Modal from 'react-native-modal'

interface DeleteWorkoutModalProps {
    isVisible: boolean
    onClose: () => void
    onDelete: () => void
    isDeleting: boolean
}

const { width } = Dimensions.get('window')

const DeleteWorkoutModal = ({ isVisible, onClose, onDelete, isDeleting }: DeleteWorkoutModalProps) => {
    const handleDelete = useCallback(() => {
        if (isDeleting) return
        onDelete()
    }, [isDeleting, onDelete])

    const handleCancel = useCallback(() => {
        if (isDeleting) return
        onClose()
    }, [isDeleting, onClose])

    return (
        <Modal
            isVisible={isVisible}
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
                    <Text style={styles.title}>Delete This Workout?</Text>
                    <Text style={styles.message}>This action cannot be undone.</Text>

                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
                            onPress={handleDelete}
                            disabled={isDeleting}
                            android_ripple={{ color: 'rgba(237, 73, 86, 0.1)' }}
                        >
                            <Text style={[styles.buttonText, styles.deleteButtonText]}>Delete</Text>
                        </Pressable>

                        <View style={styles.separator} />

                        <Pressable
                            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
                            onPress={handleCancel}
                            disabled={isDeleting}
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
        color: '#262626',
        marginBottom: 8,
        textAlign: 'center',
        paddingHorizontal: 20,
        paddingVertical: 2
    },
    message: {
        fontSize: 14,
        color: '#8e8e8e',
        marginBottom: 16,
        textAlign: 'center',
        paddingHorizontal: 20
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
        textAlign: 'center',
        color: '#262626'
    },
    deleteButtonText: {
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

export default memo(DeleteWorkoutModal)
