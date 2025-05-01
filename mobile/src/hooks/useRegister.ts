import { omit } from 'lodash'
import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { authApi } from '@/services/rest'
import { AppContext } from '@/Contexts/App.context'
import handleFormError from '@/utils/handleFormError'
import showToast from '@/utils/toast.util'
import { useForm } from 'react-hook-form'
import { schema, SchemaType } from '@/utils/rules.util'
import { yupResolver } from '@hookform/resolvers/yup'

type FormDataRegister = Pick<SchemaType, 'email' | 'first_name' | 'last_name' | 'password' | 'policy'>

const FormSchemaRegister = schema.pick(['email', 'password', 'first_name', 'last_name', 'policy'])

const useRegister = () => {
    const { setAuthenticated, setProfile } = useContext(AppContext)

    const methods = useForm<FormDataRegister>({
        defaultValues: {
            email: '',
            first_name: '',
            last_name: '',
            password: '',
            policy: false
        },
        resolver: yupResolver(FormSchemaRegister)
    })

    const registerMutation = useMutation({
        mutationFn: authApi.registerAccount
    })

    const handleRegister = methods.handleSubmit(async (data) => {
        const body = omit(data, 'policy')
        await registerMutation.mutateAsync(body, {
            onSuccess: (res) => {
                const user = res.data.data.user
                setProfile(user)
                setAuthenticated(true)
                showToast({ title: res.data.message, position: 'top' })
            },
            onError: (errors) => handleFormError(errors, methods.setError)
        })
    })

    return { handleRegister, registerMutation, methods }
}

export default useRegister
