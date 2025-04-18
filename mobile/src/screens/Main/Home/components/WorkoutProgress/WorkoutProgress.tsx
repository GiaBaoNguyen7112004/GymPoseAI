import { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import WorkoutChart, { ViewModeType } from '@/components/WorkoutChart'
import CustomDropdown from '@/components/DropdownInput/Components/Dropdown'
import { useQuery } from '@tanstack/react-query'
import { ViewModeDropdown } from '@/constants/dropdown.constant'
import { workoutHistoryApi } from '@/services/rest'

interface WorkoutProgressProps {
    user_id: string
}

function WorkoutProgressChart({ user_id }: WorkoutProgressProps) {
    const [viewMode, setViewMode] = useState<ViewModeType>('weekly')
    const { data } = useQuery({
        queryKey: ['workoutHistory', viewMode, user_id],
        queryFn: () => workoutHistoryApi.getWorkoutHistoryByViewMode({ id: user_id, viewMode }),
        staleTime: 1000 * 60 * 5
    })

    const handleChangeViewMode = (value: string) => {
        setViewMode(value as ViewModeType)
    }
    const workoutHistoryData = data?.data.data || []
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Workout Progress</Text>
                <CustomDropdown
                    data={ViewModeDropdown}
                    containerStyle={styles.viewModeButton}
                    value={viewMode}
                    textStyle={styles.viewModeText}
                    iconStyle={styles.viewModeIcon}
                    onChange={handleChangeViewMode}
                    itemTextStyle={styles.dropDownItemStyle}
                    containerDropdownStyle={styles.dropDownContainerStyle}
                />
            </View>
            <WorkoutChart viewMode={viewMode} workoutData={workoutHistoryData} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingHorizontal: 8,
        width: '100%'
    },
    title: {
        fontSize: 16,
        color: '#1D1617',
        fontWeight: '600',
        lineHeight: 24
    },
    viewModeButton: {
        position: 'relative',
        backgroundColor: '#86aeff',
        borderRadius: 20,
        alignContent: 'flex-end',
        justifyContent: 'flex-end',
        height: 30,
        paddingHorizontal: 10,
        maxWidth: 85,
        minWidth: 75
    },
    viewModeText: {
        color: '#ffffff',
        fontWeight: '400',
        fontSize: 10,
        flexShrink: 0,
        flexWrap: 'nowrap'
    },
    viewModeIcon: {
        color: '#fff',
        alignSelf: 'flex-end',
        tintColor: '#fff'
    },
    dropDownContainerStyle: {
        width: 90
    },
    dropDownItemStyle: {
        fontSize: 10
    },
    chartContainer: {
        position: 'relative'
    },
    chart: {},
    tooltip: {
        position: 'absolute',
        backgroundColor: '#ffffff',
        padding: 12,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        width: 150
    },
    tooltipDate: {
        color: '#666',
        fontSize: 12
    },
    tooltipProgress: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 2
    },
    tooltipTrend: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    tooltipWorkout: {
        color: '#666',
        fontSize: 14,
        marginBottom: 6
    },
    tooltipComparison: {
        color: '#777',
        fontSize: 12,
        marginTop: 2
    },
    progressBar: {
        height: 6,
        backgroundColor: '#f0f0f0',
        borderRadius: 3,
        overflow: 'hidden'
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#86aeff',
        borderRadius: 3
    },
    noDataContainer: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noDataText: {
        color: '#999',
        fontSize: 16
    }
})

export default WorkoutProgressChart
