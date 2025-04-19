import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Flow } from './routes.config'
import { screenMap } from './screenMap'

interface PersonalDataFlowProps {
    onClose: () => void
}

const PersonalDataFlow = ({ onClose }: PersonalDataFlowProps) => {
    const [flowStack, setFlowStack] = useState<Flow[]>(['entry'])
    const currentFlow = flowStack.at(-1)!
    const ScreenComponent = screenMap[currentFlow]

    const navigateTo = (flow: Flow) => {
        setFlowStack((prev) => [...prev, flow])
    }

    const goBack = () => {
        setFlowStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev))
    }
    const goToTop = () => {
        setFlowStack(['entry'])
    }

    return (
        <View style={styles.wrapper}>
            {ScreenComponent && (
                <ScreenComponent onNavigate={navigateTo} onGoBack={goBack} onClose={onClose} goToTop={goToTop} />
            )}
        </View>
    )
}

export default PersonalDataFlow

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    }
})
