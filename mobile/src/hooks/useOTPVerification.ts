import { useEffect, useRef, useState } from 'react'
import { Alert } from 'react-native'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'

import { schema, SchemaType } from '@/utils/rules.util'

type FormData = Pick<SchemaType, 'otp'>

const formSchema = schema.pick(['otp'])
const RESEND_TIMEOUT = 10

type UseOTPVerificationProps = {
    email: string
    onSuccess: (otp: string) => void
    verifyFn: (data: { email: string; otp: string }) => Promise<any>
    resendFn: (data: { email: string }) => Promise<any>
}

export const useOTPVerification = ({ email, onSuccess, verifyFn, resendFn }: UseOTPVerificationProps) => {
    const methods = useForm<FormData>({
        defaultValues: { otp: '' },
        resolver: yupResolver(formSchema),
        mode: 'onBlur'
    })

    const [countdown, setCountdown] = useState(0)
    const timerId = useRef<NodeJS.Timeout | null>(null)

    const { mutate: verifyOtp, isPending: isVerifying } = useMutation({
        mutationFn: verifyFn
    })

    const { mutate: resendOtp, isPending: isResending } = useMutation({
        mutationFn: resendFn
    })

    const handleSubmit = methods.handleSubmit(({ otp }) => {
        verifyOtp(
            { email, otp },
            {
                onSuccess: () => onSuccess(otp),
                onError: () => {
                    Alert.alert("That code didn't work", 'Please re-enter your code or request a new one', [
                        { text: 'Try again' }
                    ])
                }
            }
        )
    })

    const handleResend = () => {
        if (countdown > 0 || isResending) return
        setCountdown(RESEND_TIMEOUT)
        resendOtp({ email })
    }

    useEffect(() => {
        if (countdown <= 0 || timerId.current) return

        timerId.current = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1 && timerId.current) {
                    clearInterval(timerId.current)
                    timerId.current = null
                }
                return prev - 1
            })
        }, 1000)

        return () => {
            if (timerId.current) {
                clearInterval(timerId.current)
                timerId.current = null
            }
        }
    }, [countdown])

    return {
        methods,
        handleSubmit,
        handleResend,
        countdown,
        isVerifying,
        isResending
    }
}
