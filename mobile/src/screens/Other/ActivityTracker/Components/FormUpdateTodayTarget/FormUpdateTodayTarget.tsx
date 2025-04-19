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
import { FormProvider, useForm } from 'react-hook-form'
import { Text, TouchableOpacity, StyleSheet, View, Alert } from 'react-native'
import Toast from 'react-native-toast-message'

interface FormUpdateTodayTargetProps {
    waterVal: number
    caloriesVal: number
    onUpdate: () => void
    onCancel: () => void
}

function FormUpdateTodayTarget({ waterVal, caloriesVal, onUpdate, onCancel }: FormUpdateTodayTargetProps) {
    const methods = useForm<TargetSchemaType>({
        defaultValues: {
            calories: caloriesVal,
            water: waterVal
        },
        mode: 'onBlur',
        resolver: yupResolver(targetSchema),
        shouldUnregister: false
    })

    const updateTargetMutation = useMutation({
        mutationFn: targetApi.updateTodayTarget
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
        <View style={styles.wrapper}>
            <FormProvider {...methods}>
                <View style={styles.header}>
                    <Text style={styles.title}>Update Today Target</Text>
                    <TouchableOpacity style={styles.closeBtn} onPress={onCancel}>
                        <Ionicons name='close-sharp' size={16} color='#ADA4A5' />
                    </TouchableOpacity>
                </View>

                <View style={styles.inputWrapper}>
                    <TextInputCustom
                        name='water'
                        icon='glassOfWater'
                        type='numeric'
                        placeholder='Water (l)'
                        autoFocus
                    />
                    <TextInputCustom name='calories' icon='boots' type='numeric' placeholder='Calories (cal)' />
                </View>

                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                    <GradientButton
                        Square
                        style={styles.submitBtn}
                        containerStyle={{ paddingVertical: 10, paddingHorizontal: 20 }}
                        onPress={onUpdateForm}
                        disabled={!methods.formState.isValid}
                    >
                        <Text style={styles.updateText}>Update</Text>
                    </GradientButton>
                </View>
            </FormProvider>
        </View>
    )
}

export default FormUpdateTodayTarget

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        width: SCREEN_WIDTH * 0.8
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
        fontWeight: '600'
    }
})
