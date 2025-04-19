import { BaseToast, ToastConfig } from 'react-native-toast-message'

export const toastFitnessXConfig: ToastConfig = {
    fitnessXToast: (props) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: '#25363E', backgroundColor: '#25363E', borderRadius: 15 }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 15,
                fontWeight: '400',
                color: '#FFFFFF'
            }}
            text2Style={{
                fontSize: 13,
                fontWeight: '400',
                color: '#FFFFFF'
            }}
        />
    )
}
