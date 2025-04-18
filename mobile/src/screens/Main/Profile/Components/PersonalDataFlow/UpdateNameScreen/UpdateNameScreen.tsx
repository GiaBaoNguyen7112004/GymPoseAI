import { View, Text, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { schema, SchemaType } from '@/utils/rules.util'
import TextInputCustomV2 from '@/components/TextInputV2'
import GradientButton from '@/components/GradientButton'
import { useKeyboard } from '@/hooks/useKeyboard'
import useUserData from '@/hooks/useUserData'
import { ScreenComponentProps } from '../routes.config'

type FormData = Pick<SchemaType, 'first_name' | 'last_name'>
const formSchema = schema.pick(['first_name', 'last_name'])

function UpdateNameScreen({ onGoBack }: ScreenComponentProps) {
    const { isKeyboardVisible } = useKeyboard()
    const { userData } = useUserData()
    const methods = useForm<FormData>({
        defaultValues: {
            first_name: userData?.first_name,
            last_name: userData?.last_name
        },
        mode: 'onBlur',
        resolver: yupResolver(formSchema)
    })

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={onGoBack}>
                        <Ionicons name='chevron-back' size={24} color='black' />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Name</Text>
                    <View style={{ width: 24 }} />
                </View>

                <FormProvider {...methods}>
                    <View style={styles.formContainer}>
                        <View style={styles.formInputs}>
                            <ScrollView keyboardShouldPersistTaps='handled' scrollEnabled={isKeyboardVisible}>
                                <View style={styles.inputsWrapper}>
                                    <TextInputCustomV2
                                        label='first name'
                                        name='first_name'
                                        type='default'
                                        placeholder='first name'
                                        returnKeyType='next'
                                    />
                                    <TextInputCustomV2
                                        label='last name'
                                        name='last_name'
                                        type='default'
                                        placeholder='last name'
                                        noBorderBottom
                                        returnKeyType='done'
                                    />
                                </View>
                            </ScrollView>
                        </View>
                        <View style={styles.formBottom}>
                            <GradientButton
                                Square
                                style={styles.reviewButton}
                                disabled={!methods.formState.isValid}
                                onPress={methods.handleSubmit((data) => {
                                    // Xử lý dữ liệu form ở đây
                                    console.log(data)
                                    // Có thể thêm hàm callback nếu cần
                                })}
                            >
                                <Text style={styles.reviewButtonText}>Save</Text>
                            </GradientButton>
                        </View>
                    </View>
                </FormProvider>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    headerTitle: {
        fontSize: 30,
        fontWeight: '600'
    },
    formContainer: {
        flex: 1,
        justifyContent: 'space-between'
    },
    formInputs: {
        flex: 1
    },
    inputsWrapper: {
        borderRadius: 10,
        marginTop: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#DDDADA',
        marginHorizontal: 20
    },
    formBottom: {
        borderTopWidth: 1,
        borderTopColor: '#DDDADA',
        paddingHorizontal: 20
    },
    reviewButton: {
        marginTop: 20
    },
    reviewButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'white'
    }
})

export default UpdateNameScreen
