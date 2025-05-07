import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import LottieView from 'lottie-react-native'

const EmptyComponent = () => (
    <View style={styles.container}>
        <LottieView source={require('@/assets/animations/activity.json')} autoPlay loop style={styles.icon} />
        <Text style={styles.text}>No activity found</Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: 200,
        height: 200,
        marginBottom: 10
    },
    text: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '400',
        color: '#ADA4A5'
    }
})

export default EmptyComponent
