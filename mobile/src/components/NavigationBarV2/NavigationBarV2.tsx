import React, { memo } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'

interface NavbarProps {
    title: string
    MoreActions?: () => void
    searchAction?: () => void
    containerStyle?: StyleProp<ViewStyle>
    blurIntensity?: number
}

const NavigationBarV2 = ({ title, MoreActions, searchAction, containerStyle, blurIntensity = 50 }: NavbarProps) => {
    return (
        <BlurView intensity={blurIntensity} tint='light' style={[styles.container, containerStyle]}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.iconContainer}>
                {MoreActions && (
                    <TouchableOpacity style={styles.moreButton} onPress={MoreActions}>
                        <Ionicons name='ellipsis-horizontal' size={24} color='black' />
                    </TouchableOpacity>
                )}
                {searchAction && (
                    <TouchableOpacity style={styles.searchButton} onPress={searchAction}>
                        <Ionicons name='search' size={24} color='black' />
                    </TouchableOpacity>
                )}
            </View>
        </BlurView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        overflow: 'hidden',
        backgroundColor: 'rgba(255, 255, 255, 0.8)'
    },
    title: {
        fontSize: 26,
        fontWeight: '600',
        textAlign: 'left'
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    moreButton: {
        padding: 8
    },
    searchButton: {
        padding: 8
    }
})

export default memo(NavigationBarV2)
