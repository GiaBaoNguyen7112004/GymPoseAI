import Toast, { ToastPosition } from 'react-native-toast-message'

interface ToastProps {
    title: string
    subtitle?: string
    position?: ToastPosition
}

export default function showToast({ title, subtitle, position = 'bottom' }: ToastProps) {
    Toast.show({
        type: 'fitnessXToast',
        text1: title,
        text2: subtitle,
        position: position
    })
}
