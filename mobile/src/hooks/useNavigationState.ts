import { useState, useEffect, useCallback } from 'react'
import { NavigationProp } from '@react-navigation/native'

const useNavigationState = (navigation: NavigationProp<any>) => {
    const [isNavigating, setIsNavigating] = useState(false)

    const handleFocusBlur = useCallback(() => {
        setIsNavigating(false)
    }, [])

    const handleBeforeRemove = useCallback(() => {
        setIsNavigating(true)
    }, [])

    useEffect(() => {
        const unsubscribeFocus = navigation.addListener('focus', handleFocusBlur)
        const unsubscribeBlur = navigation.addListener('blur', handleFocusBlur)
        const unsubscribeBeforeRemove = navigation.addListener('beforeRemove', handleBeforeRemove)

        return () => {
            unsubscribeFocus()
            unsubscribeBlur()
            unsubscribeBeforeRemove()
        }
    }, [navigation, handleFocusBlur, handleBeforeRemove])

    return { isNavigating }
}

export default useNavigationState
