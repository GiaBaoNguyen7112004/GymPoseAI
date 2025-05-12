import React, { memo, useCallback } from 'react'
import { Text, TouchableOpacity, View, StyleSheet, SafeAreaView } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useMutation } from '@tanstack/react-query'
import { notificationApi } from '@/services/rest'

interface MoreActionNavBarProps {
    handleMarkAllAsRead?: () => void
}

const MoreActionNavBar = ({ handleMarkAllAsRead }: MoreActionNavBarProps) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={handleMarkAllAsRead}>
                    <View style={styles.iconContainer}>
                        <Feather name='mail' size={24} color='#000' />
                    </View>
                    <Text style={styles.buttonText}>Mark all as read</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default memo(MoreActionNavBar)

const styles = StyleSheet.create({
    safeArea: {
        flex: 1
    },
    container: {
        alignItems: 'center',
        padding: 20,
        paddingBottom: 50
    },
    button: {
        marginTop: 10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconContainer: {
        width: 35,
        height: 35,
        borderRadius: 999,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 24,
        color: '#1D1617'
    }
})
