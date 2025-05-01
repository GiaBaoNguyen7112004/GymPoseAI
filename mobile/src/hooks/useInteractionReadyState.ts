import { useState, useEffect } from 'react'
import { InteractionManager } from 'react-native'

function useInteractionReadyState() {
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        const task = InteractionManager.runAfterInteractions(() => {
            setIsReady(true)
        })

        return () => task.cancel()
    }, [])

    return { isReady }
}

export default useInteractionReadyState
