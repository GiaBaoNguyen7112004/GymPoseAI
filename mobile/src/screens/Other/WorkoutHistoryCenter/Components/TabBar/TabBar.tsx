import { useCategories } from '@/hooks/useCategoriesData'
import { Category } from '@/types/exercises.type'
import React, { memo, useCallback } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface TabBarProps {
    onChangeTab?: (tab: string) => void
    activeTab: string
}

const TabBar = ({ onChangeTab, activeTab }: TabBarProps) => {
    const { categoriesData, isPending } = useCategories()

    const handleTabChange = useCallback(
        (tab: string) => {
            if (tab !== activeTab) {
                onChangeTab?.(tab)
            }
        },

        [activeTab, onChangeTab]
    )

    const renderTab = useCallback(
        (tab: Category) => {
            const isActive = tab.id == activeTab
            return (
                <TouchableOpacity
                    key={tab.id}
                    style={[styles.tab, isActive && styles.activeTab]}
                    onPress={() => handleTabChange(tab.id)}
                >
                    <Text style={[styles.tabText, isActive && styles.activeTabText]}>{tab.name}</Text>
                </TouchableOpacity>
            )
        },
        [activeTab]
    )

    return <View style={styles.tabs}>{categoriesData.map(renderTab)}</View>
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
