import React, { memo, useCallback, useState } from 'react'
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import { pose_error } from '@/types/workoutHistory.type'
import TableRow from './TableRow'
import { Feather } from '@expo/vector-icons'

interface WorkoutDetailsTableProps {
    poseErrors: pose_error[]
    handlePoseErrorPress: (item: pose_error) => void
}

const WorkoutDetailsTable = ({ poseErrors, handlePoseErrorPress }: WorkoutDetailsTableProps) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    const [visibleItems, setVisibleItems] = useState<number>(3)

    const handleRowPress = useCallback(
        (error: pose_error, index: number) => {
            setSelectedIndex(index)
            handlePoseErrorPress(error)
        },
        [handlePoseErrorPress]
    )

    const handleViewMore = useCallback(() => {
        setVisibleItems((prev) => prev + 6)
    }, [])

    return (
        <>
            <View style={styles.detailsContainer}>
                <View style={styles.headingWrapper}>
                    <View style={styles.headerGroupLeft}>
                        <View style={styles.iconWrapper}>
                            <Feather name='activity' size={16} color='green' />
                        </View>
                        <Text style={styles.detailsTitle}>Workout Details</Text>
                    </View>
                    <Text style={styles.recordsText}>{poseErrors.length} records</Text>
                </View>

                <View style={styles.tableContainer}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        nestedScrollEnabled
                        style={{ flexGrow: 1 }}
                    >
                        <View style={{ flexGrow: 1 }}>
                            <View style={styles.tableHeader}>
                                <Text style={[styles.headerCell, styles.cell80, styles.fistCell]}>No.</Text>
                                <Text style={[styles.headerCell, styles.cell200]}>Pose Error</Text>
                                <Text style={[styles.headerCell, styles.cell90]}>Time</Text>
                            </View>
                            {poseErrors.slice(0, visibleItems).map((error, index) => (
                                <TableRow
                                    key={index}
                                    error={error}
                                    index={index}
                                    isSelected={selectedIndex === index}
                                    onPress={handleRowPress}
                                />
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </View>
            {visibleItems < poseErrors.length && (
                <TouchableOpacity style={styles.viewMoreButton} onPress={handleViewMore}>
                    <Text style={styles.viewMoreText}>View More</Text>
                </TouchableOpacity>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    detailsContainer: {
        marginTop: 20,
        marginHorizontal: 16,
        paddingTop: 15,
        paddingHorizontal: 16,
        paddingBottom: 10,
        borderRadius: 6,
        backgroundColor: '#fff',
        shadowColor: 'rgba(29, 22, 23, 0.3)',
        shadowOffset: { width: 1, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 2,
        marginBottom: 50
    },
    headingWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    headerGroupLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },
    iconWrapper: {
        width: 30,
        height: 30,
        borderRadius: 8,
        backgroundColor: '#F7F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: 'rgba(0, 0, 0, 0.1)'
    },
    detailsTitle: {
        fontSize: 15,
        fontWeight: '500'
    },
    tableContainer: {
        borderTopWidth: 0.6,
        borderColor: '#E5E7EB'
    },
    recordsText: {
        fontSize: 14,
        color: '#6b7280',
        paddingVertical: 8
    },
    tableHeader: {
        flexDirection: 'row',
        paddingVertical: 8
    },
    headerCell: {
        color: '#7B6F72',
        fontSize: 13,
        fontWeight: '400',
        textAlign: 'left'
    },
    fistCell: {
        paddingLeft: 20
    },
    cell80: {
        width: 80
    },
    cell90: {
        width: 90
    },
    cell200: {
        width: 200
    },
    viewMoreButton: {
        marginTop: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#F7F8F8',
        borderRadius: 6,
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.4)',
        marginBottom: 50
    },
    viewMoreText: {
        color: '#1D1617',
        fontSize: 14,
        fontWeight: '500'
    }
})

export default memo(WorkoutDetailsTable)
