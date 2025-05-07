import React, { memo } from 'react'
import { categories } from '@/types/workoutHistory.type'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface TabBarProps {
    onChangeTab?: (tab: categories) => void
    activeTab: categories
}

const TABS: categories[] = ['full body', 'lower body', 'abdominal muscles']

const TabBar = ({ onChangeTab, activeTab }: TabBarProps) => {
    const handleTabChange = (tab: categories) => {
        if (tab !== activeTab) {
            onChangeTab?.(tab)
        }
    }

    const renderTab = (tab: categories) => {
        const isActive = tab === activeTab
        return (
            <TouchableOpacity
                key={tab}
                style={[styles.tab, isActive && styles.activeTab]}
                onPress={() => handleTabChange(tab)}
            >
                <Text style={[styles.tabText, isActive && styles.activeTabText]}>{tab}</Text>
            </TouchableOpacity>
        )
    }

    return <View style={styles.tabs}>{TABS.map(renderTab)}</View>
}

export default memo(TabBar)

const styles = StyleSheet.create({
    tabs: {
        width: '100%',
        flexDirection: 'row',
        gap: 8
    },
    tab: {
        borderRadius: 9999,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        paddingHorizontal: 15,
        shadowColor: 'rgba(29, 22, 23, 0.1)',
        shadowOffset: { width: 1, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 10,
        backgroundColor: '#fff',
        elevation: 11 // Android shadow
    },
    activeTab: {
        backgroundColor: 'rgba(149, 173, 254, 0.10)'
    },
    tabText: {
        fontSize: 14,
        fontWeight: '500',
        textTransform: 'capitalize'
    },
    activeTabText: {
        color: '#5A76FA',
        fontWeight: '600'
    }
})
