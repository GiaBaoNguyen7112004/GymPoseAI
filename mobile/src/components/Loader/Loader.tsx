import { useEffect, useRef } from 'react'
import { Animated } from 'react-native'

function Loader() {
    const _loadingDeg = useRef(new Animated.Value(0)).current

    const _animationLoadingDeg = () => {
        Animated.loop(
            Animated.timing(_loadingDeg, {
                useNativeDriver: true,
                toValue: 1,
                duration: 400
            })
        ).start()
    }

    useEffect(() => {
        _animationLoadingDeg()
    }, [])

    return (
        <Animated.Image
            style={{
                width: 30,
                height: 30,
                marginRight: 10,
                transform: [
                    {
                        rotate: _loadingDeg.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', '360deg']
                        })
                    }
                ]
            }}
            source={require('@/src/assets/Icons/waiting.png')}
        />
    )
}

export default Loader
