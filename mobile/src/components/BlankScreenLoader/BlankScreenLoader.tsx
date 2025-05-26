import LottieView from 'lottie-react-native'
import React from 'react'
import { StyleSheet, View, Text, ViewStyle } from 'react-native'

interface BlankScreenLoaderProps {
    backgroundColor?: ViewStyle['backgroundColor']
    text?: string
}

function BlankScreenLoader({ backgroundColor = '#FFF', text }: BlankScreenLoaderProps) {
    return (
        <View style={[styles.container, { backgroundColor }]}>
            <View style={styles.innerContent}>
                <LottieView
                    source={require('@/assets/animations/primary_loader.json')}
                    autoPlay
                    loop
                    style={styles.lottieAnimation}
                />
                {text && <Text style={styles.title}>{text}...</Text>}
            </View>
        </View>
    )
}

export default React.memo(BlankScreenLoader)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerContent: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    lottieAnimation: {
        width: 100,
        height: 50,
        marginBottom: 5
    },
    title: {
        marginTop: 10,
        fontWeight: '600',
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        maxWidth: 200
    }
})
