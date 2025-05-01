import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SCREEN_WIDTH } from '@/constants/devices.constant'

const Header = () => (
    <View style={styles.container}>
        <View style={styles.callToAction}>
            <Text style={styles.desc}>Hey there,</Text>
            <Text style={styles.heading}>Welcome Back</Text>
        </View>
    </View>
)

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        alignItems: 'center'
    },
    callToAction: {
        marginTop: 40,
        alignItems: 'center',
        marginBottom: 15
    },
    heading: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1D1617',
        lineHeight: 30
    },
    desc: {
        fontSize: 16,
        fontWeight: '400',
        color: '#1D1617',
        lineHeight: 24
    }
})

export default Header
