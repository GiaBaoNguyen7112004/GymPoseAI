import React, { memo } from 'react'
import { StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native'
import LottieView from 'lottie-react-native'

interface EmptyStateProps {
    message?: string
    animationSource?: any
    containerStyle?: StyleProp<ViewStyle>
}

const EmptyComponentV2 = ({
    message = 'Nothing to show here',
    animationSource = require('@/assets/animations/empty_card.json'),
    containerStyle
}: EmptyStateProps) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <LottieView source={animationSource} autoPlay loop style={styles.icon} />
            <Text style={styles.message}>{message}</Text>
        </View>
    )
}

export default memo(EmptyComponentV2)

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        position: 'relative'
    },
    icon: {
        width: 180,
        height: 180
    },
    message: {
        position: 'absolute',
        bottom: 30,
        marginTop: 12,
        fontSize: 12,
        color: '#ADA4A5',
        textAlign: 'center'
    }
})
