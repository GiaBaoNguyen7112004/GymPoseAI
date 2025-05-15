import { memo, useState, useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { Flow } from './routes.config'
import { screenMap } from './screenMap'

interface PersonalDataFlowProps {
    onClose: () => void
}

const PersonalDataFlow = ({ onClose }: PersonalDataFlowProps) => {
    const [flowStack, setFlowStack] = useState<Flow[]>(['entry'])

    const currentFlow = flowStack[flowStack.length - 1]
    const ScreenComponent = screenMap[currentFlow]

    const navigateTo = useCallback((flow: Flow) => {
        setFlowStack((prev) => [...prev, flow])
    }, [])

    const goBack = useCallback(() => {
        if (flowStack.length > 1) {
            setFlowStack((prev) => prev.slice(0, -1))
        }
    }, [flowStack])

    const goToTop = useCallback(() => {
        setFlowStack(['entry'])
    }, [])

    return (
        <View style={styles.wrapper}>
            {ScreenComponent && (
                <ScreenComponent onNavigate={navigateTo} onGoBack={goBack} onClose={onClose} goToTop={goToTop} />
            )}
        </View>
    )
}

export default memo(PersonalDataFlow)

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    }
})
