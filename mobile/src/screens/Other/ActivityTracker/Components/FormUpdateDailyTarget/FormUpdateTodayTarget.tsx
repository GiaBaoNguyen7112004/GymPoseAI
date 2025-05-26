import TextInputCustom from '@/components/TextInput'
import { targetApi } from '@/services/rest'
import { showErrorAlert } from '@/utils/alert.util'
import { targetSchema, TargetSchemaType } from '@/utils/rules.util'
import showToast from '@/utils/toast.util'
import { Ionicons } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { memo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Text, TouchableOpacity, StyleSheet, View, Dimensions, Platform, Pressable } from 'react-native'
import Modal from 'react-native-modal'
import { BlurView } from 'expo-blur'

interface FormUpdateDailyTargetProps {
    visible: boolean
    onUpdate: () => void
    onCancel: () => void
}

const FormUpdateDailyTarget = ({ onUpdate, onCancel, visible }: FormUpdateDailyTargetProps) => {
    const queryClient = useQueryClient()
    const methods = useForm<TargetSchemaType>({
        defaultValues: {
            calories: 0,
            water: 0
        },
        mode: 'onBlur',
        resolver: yupResolver(targetSchema)
    })

    const updateTargetMutation = useMutation({
        mutationFn: targetApi.updateDailyTarget
    })

    const onUpdateForm = methods.handleSubmit((data) => {
        onUpdate()
        const payload = {
            water_target: data.water,
            calories_target: data.calories
        }
        updateTargetMutation.mutate(payload, {
            onSuccess: (res) => {
                queryClient.invalidateQueries({ queryKey: ['today-target'] })
                const message = res.data.message || 'Target Updated'
                showToast({ title: message, position: 'top' })
            },
            onError: () => {
                showErrorAlert({ statusCode: 'default' })
            }
        })
    })

    return (
        <Modal
            animationIn='slideInUp'
            animationOut='slideOutDown'
            animationInTiming={200}
            animationOutTiming={200}
            backdropTransitionInTiming={200}
            backdropTransitionOutTiming={200}
            onBackdropPress={onCancel}
            isVisible={visible}
            backdropOpacity={0.4}
            useNativeDriver
            style={styles.modal}
            swipeDirection='down'
            onSwipeComplete={onCancel}
        >
            <BlurView style={styles.blurContainer} tint='extraLight' intensity={0}>
                <View style={styles.innerContainer}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Update Daily Target</Text>
                        <TouchableOpacity style={styles.closeBtn} onPress={onCancel}>
                            <Ionicons name='close-sharp' size={18} color='#8e8e8e' />
                        </TouchableOpacity>
                    </View>

                    <FormProvider {...methods}>
                        <View style={styles.inputWrapper}>
                            <TextInputCustom
                                {...methods.register('water')}
                                name='water'
                                icon='glassOfWater'
                                type='numeric'
                                placeholder='Water (l)'
                                autoFocus
                                returnKeyType='next'
                                onSubmitEditing={() => methods.setFocus('calories')}
                            />
                            <TextInputCustom
                                {...methods.register('calories')}
                                name='calories'
                                icon='boots'
                                type='numeric'
                                placeholder='Calories (cal)'
                                returnKeyType='done'
                                onSubmitEditing={onUpdateForm}
                            />
                        </View>

                        <View style={styles.separator} />

                        <View style={styles.buttonGroup}>
                            <Pressable
                                style={({ pressed }) => [
                                    styles.button,
                                    pressed && styles.buttonPressed,
                                    styles.cancelButton
                                ]}
                                onPress={onCancel}
                                disabled={updateTargetMutation.isPending}
                            >
                                <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancel</Text>
                            </Pressable>
                            <View style={styles.verticalSeparator} />
                            <Pressable
                                style={({ pressed }) => [
                                    styles.button,
                                    pressed && styles.buttonPressed,
                                    styles.updateButton
                                ]}
                                onPress={onUpdateForm}
                                disabled={!methods.formState.isValid || updateTargetMutation.isPending}
                            >
                                <Text style={[styles.buttonText, styles.updateButtonText]}>Update</Text>
                            </Pressable>
                        </View>
                    </FormProvider>
                </View>
            </BlurView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0
    },
    blurContainer: {
        borderRadius: 12,
        overflow: 'hidden',
        width: '100%'
    },
    innerContainer: {
        backgroundColor: '#FFFFFF',
        paddingTop: 16,
        paddingBottom: 8,
        alignItems: 'center'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 16,
        width: '100%'
    },
    title: {
        fontSize: 16,
        fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
        color: '#262626'
    },
    closeBtn: {
        padding: 8
    },
    inputWrapper: {
        gap: 16,
        paddingHorizontal: 16,
        marginBottom: 24,
        width: '100%'
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#dbdbdb',
        width: '100%',
        marginBottom: 16
    },
    buttonGroup: {
        flexDirection: 'row',
        width: '100%',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#dbdbdb'
    },
    button: {
        flex: 1,
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'center'
    },
    cancelButton: {},
    cancelButtonText: {
        color: '#8e8e8e',
        fontWeight: '500'
    },
    updateButton: {},
    updateButtonText: {
        color: '#0095F6',
        fontWeight: '500'
    },
    verticalSeparator: {
        width: StyleSheet.hairlineWidth,
        backgroundColor: '#dbdbdb'
    },
    buttonPressed: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)'
    }
})

export default memo(FormUpdateDailyTarget)
