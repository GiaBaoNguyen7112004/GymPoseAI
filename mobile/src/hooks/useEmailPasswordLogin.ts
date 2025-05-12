import { useCallback, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'

import { authApi } from '@/services/rest'
import { schema, SchemaType } from '@/utils/rules.util'
import handleFormError from '@/utils/handleFormError'
import useAppContext from './useAppContext'

export type FormData = Pick<SchemaType, 'email' | 'password'>
const formSchema = schema.pick(['email', 'password'])

export function useEmailPasswordLogin() {
    const { setAuthenticated, setProfile } = useAppContext()

    const methods = useForm<FormData>({
        defaultValues: { email: '', password: '' },
        resolver: yupResolver(formSchema)
    })

    const loginMutation = useMutation({
        mutationFn: authApi.login
    })

    const handleLogin = methods.handleSubmit((data) => {
        loginMutation.mutate(data, {
            onSuccess: ({ data }) => {
                setAuthenticated(true)
                setProfile(data.data.user)
            },
            onError: (error) => handleFormError<FormData>(error, methods.setError)
        })
    })

    return {
        methods,
        handleLogin,
        loginMutation
    }
}
