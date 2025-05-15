import GradientButton from '@/components/GradientButton'
import TextInputCustom from '@/components/TextInput'
import { SCREEN_WIDTH } from '@/constants/devices.constant'
import { targetApi } from '@/services/rest'
import { showErrorAlert } from '@/utils/alert.util'
import { targetSchema, TargetSchemaType } from '@/utils/rules.util'
import showToast from '@/utils/toast.util'
import { Ionicons } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { memo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import Modal from 'react-native-modal'

interface FormUpdateDailyTargetProps {
    visible: boolean
    waterVal: number
    caloriesVal: number
    onUpdate: () => void
    onCancel: () => void
}

function FormUpdateDailyTarget({ waterVal, caloriesVal, onUpdate, onCancel, visible }: FormUpdateDailyTargetProps) {
    const methods = useForm<TargetSchemaType>({
        defaultValues: {
            calories: caloriesVal,
            water: waterVal
        },
        mode: 'onBlur',
        resolver: yupResolver(targetSchema)
    })

    const updateTargetMutation = useMutation({
        mutationFn: targetApi.updateDailyTarget
    })
    const onUpdateForm = methods.handleSubmit((data) => {
        onUpdate()
        updateTargetMutation.mutate(data, {
            onSuccess: (res) => {
                const message = res.data.message || 'Target Updated'
                showToast({ title: message })
            },
            onError: () => {
                showErrorAlert('default')
            }
        })
    })

    return (
        <Modal
            animationIn='fadeInUp'
            animationOut='fadeOutDown'
            animationInTiming={300}
            animationOutTiming={300}
            onBackdropPress={onCancel}
            isVisible={visible}
        >
            <View style={styles.wrapper}>
                <FormProvider {...methods}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Update Daily Target</Text>
                        <TouchableOpacity style={styles.closeBtn} onPress={onCancel}>
                            <Ionicons name='close-sharp' size={16} color='#ADA4A5' />
                        </TouchableOpacity>
                    </View>

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

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <GradientButton
                            Square
                            style={styles.submitBtn}
                            onPress={onUpdateForm}
                            disabled={!methods.formState.isValid}
                        >
                            <Text style={styles.updateText}>Update</Text>
                        </GradientButton>
                    </View>
                </FormProvider>
            </View>
        </Modal>
    )
}

export default memo(FormUpdateDailyTarget)

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        position: 'relative',
        borderBottomColor: '#DDDADA',
        borderBottomWidth: 1,
        paddingBottom: 16
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1D1617'
    },
    closeBtn: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputWrapper: {
        gap: 16,
        marginBottom: 24
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cancelBtn: {
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 999,
        backgroundColor: '#FFF',
        borderColor: '#DDDADA',
        borderWidth: 1
    },
    submitBtn: {
        height: 45
    },
    cancelText: {
        color: '#ADA4A5',
        fontWeight: '600'
    },
    updateText: {
        color: '#fff',
        fontWeight: '600',
        position: 'absolute'
    }
})
