import { categories } from '@/types/workoutHistory.type'
import { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface TabBarProps {
    onChangeTab?: (tab: string) => void
    activeTab?: categories
}

const TABS: categories[] = ['full body', 'lower body', 'abdominal muscles']

function TabBar({ onChangeTab, activeTab }: TabBarProps) {
    const [activeTabState, setActiveTab] = useState<categories>(activeTab || 'full body')

    const handleTabChange = (tab: categories) => {
        setActiveTab(tab)
        onChangeTab?.(tab)
    }

    return (
        <View style={styles.tabs}>
            {TABS.map((tab) => {
                const isActive = tab === activeTabState
                return (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tab, isActive && styles.activeTab]}
                        onPress={() => handleTabChange(tab)}
                    >
                        <Text style={[styles.tabText, isActive && styles.activeTabText]}>{capitalize(tab)}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

export default TabBar

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

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

        // Android shadow
        elevation: 11
    },
    activeTab: {
        backgroundColor: 'rgba(149, 173, 254, 0.10)'
    },
    tabText: {
        fontSize: 14,
        fontWeight: '500'
    },
    activeTabText: {
        color: '#5A76FA',
        fontWeight: '600'
    }
})
