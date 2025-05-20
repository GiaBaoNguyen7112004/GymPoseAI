import React, { memo } from 'react'
import { Text, TouchableOpacity, View, StyleSheet, SafeAreaView } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

interface MoreActionNavBarProps {
    handleDeleteWorkout?: () => void
    handleResumeWorkout?: () => void
    isCompleteWorkout?: boolean
}

const MoreActionNavBar = ({
    handleDeleteWorkout,
    handleResumeWorkout,
    isCompleteWorkout = true
}: MoreActionNavBarProps) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={handleDeleteWorkout}>
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons name='close-circle' size={24} color='#000' />
                    </View>
                    <Text style={styles.buttonText}>Delete workout </Text>
                </TouchableOpacity>
                {!isCompleteWorkout && (
                    <TouchableOpacity style={styles.button} onPress={handleResumeWorkout}>
                        <View style={styles.iconContainer}>
                            <MaterialCommunityIcons name='restart' size={24} color='#000' />
                        </View>
                        <Text style={styles.buttonText}>Resume workout </Text>
                    </TouchableOpacity>
                )}
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
