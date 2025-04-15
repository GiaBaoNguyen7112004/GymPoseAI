import { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const FILTERS = ['weekly', 'monthly', 'yearly', 'daily'] as const
type Filter = (typeof FILTERS)[number]

interface FilterBarProps {
    onChangeFilter?: (value: string) => void
    activeFilterProp?: Filter
}

function FilterBar({ activeFilterProp, onChangeFilter }: FilterBarProps) {
    const [activeFilter, setActiveFilter] = useState<Filter>(activeFilterProp || 'weekly')
    const handleChangeViewMode = (value: Filter) => {
        setActiveFilter(value)
        onChangeFilter?.(value)
    }
    return (
        <View style={styles.durationFilters}>
            {FILTERS.map((filter) => {
                const isActive = filter === activeFilter
                return (
                    <TouchableOpacity
                        key={filter}
                        style={[styles.filterButton, isActive && styles.activeFilterButton]}
                        onPress={() => handleChangeViewMode(filter)}
                    >
                        <Text style={[styles.filterButtonText, isActive && styles.activeFilterButtonText]}>
                            {capitalize(filter)}
                        </Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

export default FilterBar

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

const styles = StyleSheet.create({
    durationFilters: {
        flexDirection: 'row',
        gap: 8
    },
    filterButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 9999,
        borderWidth: 1,
        borderColor: '#d1d5db',
        backgroundColor: 'white'
    },
    activeFilterButton: {
        borderColor: '#93A7FE'
    },
    filterButtonText: {
        fontSize: 14,
        color: '#4b5563'
    },
    activeFilterButtonText: {
        color: '#93A7FE'
    }
})
