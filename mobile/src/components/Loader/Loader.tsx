import { useEffect, useRef } from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'

interface Props {
    title: string
}

function Loader({ title }: Props) {
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
        <View style={styles.loadingWrapper}>
            <View style={styles.loading}>
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
                <Text style={{ fontWeight: '500' }}>{title}...</Text>
            </View>
        </View>
    )
}

export default Loader

const styles = StyleSheet.create({
    loadingWrapper: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 99,
        inset: 0
    },
    loading: {
        flexDirection: 'row',
        padding: 15,
        borderRadius: 5,
        backgroundColor: '#fff',
        alignItems: 'center'
    }
})
