import React from 'react'
import { ActivityIndicator, StyleSheet, View, ViewStyle } from 'react-native'

interface BlankScreenLoaderProps {
    backgroundColor?: ViewStyle['backgroundColor']
    spinnerColor?: string
}

function BlankScreenLoader({ backgroundColor = '#FFF', spinnerColor = '#000' }: BlankScreenLoaderProps) {
    return (
        <View style={[styles.container, { backgroundColor }]}>
            <ActivityIndicator size='large' color={spinnerColor} />
        </View>
    )
}

export default React.memo(BlankScreenLoader)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
