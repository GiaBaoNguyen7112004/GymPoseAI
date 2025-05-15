import React from 'react'
import { View, StyleSheet } from 'react-native'
import Loader from '@/components/Loader'

const FooterLoader = () => (
    <View style={styles.container}>
        <Loader />
    </View>
)

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        alignItems: 'center'
    }
})

export default FooterLoader
