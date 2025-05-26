import React, { memo, useCallback } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

type ViewMode = 'weekly' | 'monthly' | 'all'

interface BottomNavigationProps {
    viewMode: ViewMode
    setViewMode: (mode: ViewMode) => void
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ viewMode, setViewMode }) => {
    const navItems: {
        key: ViewMode
        label: string
        text?: string
        icon?: JSX.Element
    }[] = [
        { key: 'weekly', label: 'W', text: '7' },
        { key: 'monthly', label: 'M', text: '30' },
        {
            key: 'all',
            label: 'All',
            icon: <Ionicons name='menu' size={24} />
        }
    ]

    const handlePress = useCallback(
        (mode: ViewMode) => {
            if (mode !== viewMode) setViewMode(mode)
        },
        [viewMode, setViewMode]
    )

    return (
        <View style={styles.bottomNav}>
            {navItems.map(({ key, label, text, icon }) => {
                const isActive = viewMode === key
                return (
                    <TouchableOpacity key={key} style={styles.navItem} onPress={() => handlePress(key)}>
                        <View style={[styles.navButton, isActive && styles.activeNavButton]}>
                            {icon ? (
                                React.cloneElement(icon, {
                                    color: isActive ? '#9DCEFF' : '#999'
                                })
                            ) : (
                                <Text style={isActive ? styles.activeNavText : styles.navText}>{text}</Text>
                            )}
                        </View>
                        {isActive && <Text style={styles.activeNavLabel}>{label}</Text>}
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

export default memo(BottomNavigation)

const styles = StyleSheet.create({
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        gap: 50
    },
    navItem: {
        alignItems: 'center'
    },
    navButton: {
        width: 35,
        height: 35,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center'
    },
    activeNavButton: {
        borderColor: '#9DCEFF'
    },
    navText: {
        fontSize: 14,
        color: '#999'
    },
    activeNavText: {
        fontSize: 14,
        color: '#9DCEFF',
        fontWeight: 'bold'
    },
    activeNavLabel: {
        marginTop: 5,
        fontSize: 12,
        color: '#9DCEFF'
    }
})
