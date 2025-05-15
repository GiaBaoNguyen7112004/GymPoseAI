import React from 'react'
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native'
import { Skeleton } from 'moti/skeleton'

const windowWidth = Dimensions.get('window').width
const PADDING = 16

const Spacer = ({ height }: { height: number }) => <View style={{ height }} />

const ExerciseDetailSkeleton = ({ show = true }: { show?: boolean }) => {
    const skeletonProps = {
        colorMode: 'light' as const,
        radius: 8
    }

    return (
        <ScrollView style={styles.screen} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <Skeleton.Group show={show}>
                {/* Header */}
                <View style={styles.header}>
                    <Skeleton height={32} width={32} {...skeletonProps} radius={12} />
                </View>

                {/* Media */}
                <View style={styles.media}>
                    <Skeleton height={windowWidth * (9 / 16)} width={'100%'} {...skeletonProps} radius={12} />
                </View>

                {/* Title */}
                <View style={styles.section}>
                    <Skeleton height={28} width={'75%'} {...skeletonProps} />
                    <Spacer height={8} />
                    <Skeleton height={18} width={'55%'} {...skeletonProps} />
                </View>

                {/* Description */}
                <View style={styles.section}>
                    <Skeleton height={22} width={'40%'} {...skeletonProps} />
                    <Spacer height={12} />
                    <Skeleton height={15} width={'100%'} {...skeletonProps} />
                    <Spacer height={6} />
                    <Skeleton height={15} width={'100%'} {...skeletonProps} />
                    <Spacer height={6} />
                    <Skeleton height={15} width={'85%'} {...skeletonProps} />
                </View>
            </Skeleton.Group>

            <Spacer height={50} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    container: {
        paddingHorizontal: PADDING,
        paddingTop: PADDING,
        paddingBottom: PADDING * 2
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: PADDING,
        paddingHorizontal: PADDING / 2
    },
    media: {
        marginBottom: PADDING * 1.5,
        backgroundColor: '#E0E0E0',
        borderRadius: 12,
        overflow: 'hidden'
    },
    section: {
        marginBottom: PADDING * 1.5,
        paddingHorizontal: PADDING / 2
    }
})

export default ExerciseDetailSkeleton
