import React from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import { BlurView } from 'expo-blur'
import LottieView from 'lottie-react-native'

interface Props {
    title?: string
    isVisible: boolean
}

export default function LoaderModal({ title, isVisible = false }: Props) {
    if (!isVisible) {
        return null
    }

    const showText = Boolean(title)

    return (
        <View style={styles.loadingOverlay}>
            <View style={StyleSheet.absoluteFill} />
            <View style={[styles.contentBox, !showText && styles.noBlurBox]}>
                {showText && (
                    <BlurView intensity={Platform.OS === 'ios' ? 70 : 95} tint='light' style={styles.blurBackground} />
                )}
                <View style={styles.innerContent}>
                    <LottieView
                        source={require('@/assets/animations/primary_loader.json')}
                        autoPlay
                        loop
                        style={styles.lottieAnimation}
                    />
                    {showText && <Text style={styles.title}>{title}...</Text>}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999
    },
    contentBox: {
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: 'transparent'
    },
    noBlurBox: {
        backgroundColor: 'transparent',
        padding: 10
    },
    blurBackground: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 20
    },
    innerContent: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
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
