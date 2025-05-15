import LottieView from 'lottie-react-native'
import { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'

const PreCallBackgroundGradient = () => {
    return (
        <LottieView
            source={require('@/assets/animations/bg_gradient.json')}
            autoPlay
            loop
            resizeMode='cover'
            style={styles.fullScreen}
        />
    )
}

const styles = StyleSheet.create({
    fullScreen: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#FFF'
    }
})

export default PreCallBackgroundGradient
