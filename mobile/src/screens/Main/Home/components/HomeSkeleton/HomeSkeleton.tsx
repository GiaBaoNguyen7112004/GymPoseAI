import React from 'react'
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native'
import { Skeleton } from 'moti/skeleton'

const PADDING = 16
const windowWidth = Dimensions.get('window').width

const skeletonColorMode: 'light' | 'dark' = 'light'
const skeletonRectProps = { colorMode: skeletonColorMode, radius: 6 }
const skeletonCircleProps = { colorMode: skeletonColorMode, radius: 'round' as const }

const HomeSkeleton = ({ show = true }: { show?: boolean }) => {
    return (
        <ScrollView style={styles.screen} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <Skeleton.Group show={show}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Skeleton height={14} width='30%' {...skeletonRectProps} />
                        <View style={styles.spacingSmall} />
                        <Skeleton height={28} width='60%' {...skeletonRectProps} radius={8} />
                    </View>
                    <Skeleton height={36} width={36} {...skeletonCircleProps} />
                </View>

                {/* Large Card */}
                <View style={styles.cardLarge}>
                    <View style={styles.flex1PaddingRight}>
                        <Skeleton height={20} width='70%' {...skeletonRectProps} />
                        <View style={styles.spacingXSmall} />
                        <Skeleton height={16} width='90%' {...skeletonRectProps} />
                        <View style={styles.spacingMedium} />
                        <Skeleton height={35} width={100} {...skeletonRectProps} radius={10} />
                    </View>
                    <Skeleton height={70} width={70} {...skeletonCircleProps} />
                </View>

                {/* Simple Card Row */}
                <View style={[styles.cardSimple, styles.rowBetween]}>
                    <Skeleton height={20} width='40%' {...skeletonRectProps} />
                    <Skeleton height={30} width={80} {...skeletonRectProps} radius={10} />
                </View>

                {/* Section Title */}
                <View style={styles.sectionTitle}>
                    <Skeleton height={22} width='50%' {...skeletonRectProps} />
                </View>

                {/* Activity Card */}
                <View style={styles.cardActivity}>
                    <View style={styles.rowBetween}>
                        <View>
                            <Skeleton height={18} width={80} {...skeletonRectProps} />
                            <View style={styles.spacingXSmall} />
                            <Skeleton height={24} width={100} {...skeletonRectProps} />
                        </View>
                        <Skeleton height={25} width={70} {...skeletonRectProps} radius={12} />
                    </View>
                    <View style={styles.spacingMedium} />
                    <Skeleton height={60} width='100%' {...skeletonRectProps} />
                </View>
            </Skeleton.Group>

            <View style={styles.bottomSpacer} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    container: {
        padding: PADDING
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: PADDING * 1.5
    },
    cardLarge: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: PADDING * 1.2,
        marginBottom: PADDING * 1.5,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E5E5'
    },
    flex1PaddingRight: {
        flex: 1,
        paddingRight: PADDING
    },
    cardSimple: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        paddingVertical: PADDING,
        paddingHorizontal: PADDING * 1.2,
        marginBottom: PADDING * 1.5,
        borderWidth: 1,
        borderColor: '#E5E5E5'
    },
    sectionTitle: {
        marginBottom: PADDING * 0.75
    },
    cardActivity: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: PADDING * 1.2,
        marginBottom: PADDING * 1.5,
        borderWidth: 1,
        borderColor: '#E5E5E5'
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    spacingXSmall: {
        height: 6
    },
    spacingSmall: {
        height: 8
    },
    spacingMedium: {
        height: 15
    },
    bottomSpacer: {
        height: 50
    }
})

export default HomeSkeleton
