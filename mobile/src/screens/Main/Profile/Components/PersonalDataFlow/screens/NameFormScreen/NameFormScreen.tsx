import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { FlowProps } from '../../PersonalDataFlow'
import { FormProvider, useForm } from 'react-hook-form'
import { schema, SchemaType } from '@/utils/rules.util'
import { yupResolver } from '@hookform/resolvers/yup'
import GradientButton from '@/components/GradientButton'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { ResponseApi } from '@/types/utils.type'
import { User } from '@/types/user.type'
import TextInputCustomV2 from '@/components/TextInputV2'

type formData = Pick<SchemaType, 'first_name' | 'last_name'>
const formScheme = schema.pick(['first_name', 'last_name'])

interface NameFormScreenProps extends FlowProps {
    refetch: (
        options?: RefetchOptions
    ) => Promise<QueryObserverResult<AxiosResponse<ResponseApi<User, any>, any>, Error>>
    first_name?: string
    last_name?: string
}

const NameFormScreen: React.FC<NameFormScreenProps> = ({ onGoBack, first_name, last_name, refetch }) => {
    const methods = useForm<formData>({
        defaultValues: {
            first_name: first_name,
            last_name: last_name
        },
        mode: 'onBlur',
        resolver: yupResolver(formScheme)
    })

    return (
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
                    <View style={styles.inputsWrapper}>
                        <TextInputCustomV2
                            label='first name'
                            name='first_name'
                            type='default'
                            placeholder='first name'
                        />
                        <TextInputCustomV2
                            label='last name'
                            name='last_name'
                            type='default'
                            placeholder='last name'
                            noBorderBottom
                        />
                    </View>

                    <GradientButton Square style={styles.reviewButton}>
                        <Text style={styles.reviewButtonText}>Save</Text>
                    </GradientButton>
                </View>
            </FormProvider>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        paddingVertical: 16
    },
    headerTitle: {
        marginTop: 5,
        fontSize: 30,
        fontWeight: '600'
    },
    formContainer: {
        marginTop: 20,
        gap: 20
    },
    inputsWrapper: {
        borderRadius: 10,
        marginTop: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#DDDADA'
    },
    pagination: { backgroundColor: '#DDDADA', height: 1 },
    infoText: {
        fontSize: 14,
        color: '#666',
        marginTop: 10,
        marginBottom: 20
    },
    linkText: {
        color: '#1877f2'
    },
    sectionDivider: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginVertical: 20
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5
    },
    sectionDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 15
    },
    manageButton: {
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        marginBottom: 30
    },
    manageButtonText: {
        fontSize: 16,
        fontWeight: '500'
    },
    reviewButton: {
        marginTop: 30
    },
    reviewButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'white'
    }
})

export default NameFormScreen
