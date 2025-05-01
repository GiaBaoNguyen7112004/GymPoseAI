import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, SchemaType } from '@/utils/rules.util'
import { userApi } from '@/services/rest'
import { Gender } from '@/types/user.type'
import { useMutation } from '@tanstack/react-query'
import handleFormError from '@/utils/handleFormError'
import showToast from '@/utils/toast.util'
import useUserData from '@/hooks/useUserData'

type FormData = Pick<SchemaType, 'date_of_birth' | 'gender' | 'height' | 'weight'>
const formSchema = schema.pick(['date_of_birth', 'gender', 'height', 'weight'])

interface UseProfileFormProps {
    onSuccessCallback?: (response: any) => void
    onErrorCallback?: (errors: any) => void
}

export const useProfileForm = ({ onSuccessCallback, onErrorCallback }: UseProfileFormProps) => {
    const { userData, refetch } = useUserData()
    const methods = useForm<FormData>({
        resolver: yupResolver(formSchema),
        mode: 'onChange'
    })
    const { mutate: updateProfileMutate, isPending } = useMutation({
        mutationFn: userApi.updateProfile
    })

    useEffect(() => {
        if (userData) {
            methods.setValue('date_of_birth', new Date(userData.date_of_birth) || new Date())
            methods.setValue('gender', userData.gender as Gender)
            methods.setValue('height', userData.height ?? 0)
            methods.setValue('weight', userData.weight ?? 0)
        }
    }, [userData, methods])

    const onSubmit = methods.handleSubmit((data) => {
        const body = {
            ...data,
            date_of_birth: data.date_of_birth.toISOString(),
            gender: data.gender as Gender
        }
        updateProfileMutate(body, {
            onSuccess: (res) => {
                showToast({ title: res.data.message })
                refetch()
                if (onSuccessCallback) {
                    onSuccessCallback(res)
                }
            },
            onError: (errors) => {
                handleFormError<FormData>(errors, methods.setError)
                if (onErrorCallback) {
                    onErrorCallback(errors)
                }
            }
        })
    })

    return {
        methods,
        isPending,
        onSubmit
    }
}
