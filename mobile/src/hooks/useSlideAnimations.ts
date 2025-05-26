import { useEffect, useRef } from 'react'
import { Animated, Easing } from 'react-native'

interface UseAnimationsProps {
    assessmentResult: string
    duration: number
}

export default function useSlideAnimations({ assessmentResult, duration }: UseAnimationsProps) {
    const fadeAnim = useRef(new Animated.Value(0)).current
    const slideAnim = useRef(new Animated.Value(20)).current

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration,
                easing: Easing.ease,
                useNativeDriver: true
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration,
                easing: Easing.ease,
                useNativeDriver: true
            })
        ]).start()
    }, [assessmentResult, fadeAnim, slideAnim, duration])

    return { fadeAnim, slideAnim }
}
