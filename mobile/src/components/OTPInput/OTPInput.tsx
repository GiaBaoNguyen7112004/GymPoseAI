import { useFormContext } from 'react-hook-form'
import OTPInputControlled, { OTPInputControlledProps } from './Components/OTPInputControlled'

function OTPInput(props: OTPInputControlledProps) {
    const { name } = props

    const formContext = useFormContext()

    if (!formContext || !name) {
        const msg = !formContext ? 'CodeInput must be wrapped by the FormProvider' : 'Name must be defined'
        console.error(msg)
        return null
    }

    return <OTPInputControlled {...props} />
}

export default OTPInput
