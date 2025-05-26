import { Ionicons } from '@expo/vector-icons'
import React, { memo } from 'react'
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { BlurView } from 'expo-blur'

interface HeaderProps {
    headerTitle: string
    onBackPress: () => void
    onTitlePress: () => void
    style?: StyleProp<ViewStyle>
}

function Header({ headerTitle, onBackPress, onTitlePress, style }: HeaderProps) {
    return (
        <BlurView intensity={50} blurReductionFactor={50} tint='light' style={[styles.container, style]}>
            <Pressable onPress={onBackPress}>
                <Ionicons name='chevron-back' size={28} color='#1D1617' />
            </Pressable>

            <Pressable style={styles.titleContainer} onPress={onTitlePress}>
                <Text style={styles.titleText}>{headerTitle}</Text>
                <Ionicons name='chevron-down-circle' size={20} color='#1D1617' />
            </Pressable>

            <View style={styles.spacer} />
        </BlurView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'rgba(230, 240, 250, 0.8)'
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 1
    },
    titleText: {
        color: '#1D1617',
        fontSize: 16,
        fontWeight: '400',
        marginRight: 5
    },
    spacer: {
        width: 28
    }
})

export default memo(Header)
