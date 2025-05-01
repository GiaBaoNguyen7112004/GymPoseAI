import GradientButton from '@/components/GradientButton'
import { useKeyboard } from '@/hooks/useKeyboard'
import { Ionicons } from '@expo/vector-icons'
import { FormProvider } from 'react-hook-form'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScreenComponentProps } from '../routes.config'
import DropdownInput from '@/components/DropdownInput'
import DatePickerInput from '@/components/DatePickerInput'
import { DataGender } from '@/constants/dropdown.constant'
import TextInputWithUnit from '@/components/TextInputWithUnit'
import { useProfileForm } from '@/hooks/useProfileForm'

function UpdateProfileDetailScreen({ onGoBack, goToTop }: ScreenComponentProps) {
    const { isKeyboardVisible } = useKeyboard()
    const handleSuccess = () => {
        if (goToTop) goToTop()
    }

    const { methods, isPending, onSubmit } = useProfileForm({
        onSuccessCallback: handleSuccess
    })

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onGoBack}>
                    <Ionicons name='chevron-back' size={24} color='black' />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Profile</Text>
                <View style={styles.headerSpacer} />
            </View>

            <FormProvider {...methods}>
                <View style={styles.formContainer}>
                    <ScrollView
                        style={styles.formInputs}
                        keyboardShouldPersistTaps='handled'
                        scrollEnabled={isKeyboardVisible}
                    >
                        <FormRow>
                            <DropdownInput
                                data={DataGender}
                                iconSource='twoUserIcon'
                                placeholder='Gender'
                                name='gender'
                            />
                        </FormRow>
                        <FormRow>
                            <DatePickerInput icon='calendarIcon' name='date_of_birth' label='Date of birth' />
                        </FormRow>
                        <FormRow>
                            <TextInputWithUnit
                                {...methods.register('weight')}
                                name='weight'
                                icon='weightScaleIcon'
                                type='numeric'
                                unit='KG'
                                returnKeyType='next'
                                onSubmitEditing={() => {
                                    methods.setFocus('height')
                                }}
                            />
                        </FormRow>
                        <FormRow>
                            <TextInputWithUnit
                                {...methods.register('height')}
                                name='height'
                                icon='swapIcon'
                                type='numeric'
                                unit='CM'
                                returnKeyType='done'
                                onSubmitEditing={onSubmit}
                            />
                        </FormRow>
                    </ScrollView>
                </View>

                <View style={styles.formBottom}>
                    <GradientButton
                        Square
                        style={styles.reviewButton}
                        disabled={!methods.formState.isValid}
                        isLoading={isPending}
                        onPress={onSubmit}
                    >
                        <Text style={styles.reviewButtonText}>Save</Text>
                    </GradientButton>
                </View>
            </FormProvider>
        </View>
    )
}

const FormRow = ({ children }: { children: React.ReactNode }) => <View style={styles.rowForm}>{children}</View>

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
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
    headerSpacer: {
        width: 24
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 20
    },
    formInputs: {
        flex: 1
    },
    rowForm: {
        width: '100%',
        marginVertical: 9,
        flexDirection: 'row'
    },
    formBottom: {
        borderTopWidth: 1,
        borderTopColor: '#DDDADA',
        paddingHorizontal: 20,
        paddingBottom: 20
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

export default UpdateProfileDetailScreen
