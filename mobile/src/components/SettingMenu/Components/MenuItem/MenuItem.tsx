import { Ionicons } from '@expo/vector-icons'
import { memo } from 'react'
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native'

interface MenuItemProps {
    title: string
    onPress: () => void
    isLast?: boolean
}

function MenuItem({ title, onPress, isLast = false }: MenuItemProps) {
    const containerStyle: ViewStyle[] = [styles.container]
    if (isLast) containerStyle.push(styles.lastItem)

    return (
        <TouchableOpacity style={containerStyle} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
            <Ionicons name='chevron-forward' size={20} color='#888' />
        </TouchableOpacity>
    )
}

export default memo(MenuItem)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#DDDADA'
    },
    lastItem: {
        borderBottomWidth: 0
    },
    text: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1D1617'
    }
})
