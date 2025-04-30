import { forwardRef, memo } from 'react'
import { useFormContext } from 'react-hook-form'
import ControlledInput, { ControllerInputProps } from './components/ControlledInput'
import { TextInput } from 'react-native'

const TextInputV2Custom = forwardRef<TextInput, ControllerInputProps>((props, ref) => {
    const { name } = props

    const formContext = useFormContext()

    if (!formContext || !name) {
        const msg = !formContext ? 'TextInput must be wrapped by the FormProvider' : 'Name must be defined'
        console.error(msg)
        return null
    }

    return <ControlledInput {...props} ref={ref} />
})

export default TextInputV2Custom
