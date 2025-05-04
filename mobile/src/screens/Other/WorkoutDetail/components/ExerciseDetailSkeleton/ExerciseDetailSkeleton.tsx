import React from 'react'
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native'
import { Skeleton } from 'moti/skeleton'

const windowWidth = Dimensions.get('window').width
const PADDING = 16

const ExerciseDetailSkeleton = ({ show = true }: { show?: boolean }) => {
    const skeletonColorMode: 'light' | 'dark' = 'light'
    const skeletonProps = { colorMode: skeletonColorMode, radius: 8 }

    return (
        <ScrollView style={styles.screen} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <Skeleton.Group show={show}>
                <View style={styles.headerButtons}>
                    <Skeleton height={32} width={32} {...skeletonProps} radius='round' />
                    <Skeleton height={32} width={32} {...skeletonProps} radius='round' colorMode='light' />
                </View>

                <View style={styles.mediaContainer}>
                    <Skeleton height={windowWidth * (9 / 16)} width={'100%'} {...skeletonProps} radius={12} />
                    <View style={styles.playButtonOverlay}>
                        <Skeleton height={50} width={50} {...skeletonProps} radius='round' />
                    </View>
                </View>

                <View style={styles.titleSection}>
                    <Skeleton height={28} width={'75%'} {...skeletonProps} />
                    <View style={{ height: 8 }} />
                    <Skeleton height={18} width={'55%'} {...skeletonProps} />
                </View>

                <View style={styles.section}>
                    <Skeleton height={22} width={'40%'} {...skeletonProps} />
                    <View style={{ height: 12 }} />
                    <Skeleton height={15} width={'100%'} {...skeletonProps} />
                    <View style={{ height: 6 }} />
                    <Skeleton height={15} width={'100%'} {...skeletonProps} />
                    <View style={{ height: 6 }} />
                    <Skeleton height={15} width={'85%'} {...skeletonProps} />
                </View>

                <View style={styles.section}>
                    <View style={styles.howToHeader}>
                        <Skeleton height={22} width={'35%'} {...skeletonProps} />
                        <Skeleton height={18} width={'25%'} {...skeletonProps} />
                    </View>

                    {[1, 2, 3].map((stepIndex) => (
                        <View key={`step-${stepIndex}`} style={styles.stepItem}>
                            <View style={styles.stepIndicator}>
                                <Skeleton height={20} width={25} {...skeletonProps} radius={4} />
                                <View style={{ height: 10 }} />
                                <Skeleton height={18} width={18} {...skeletonProps} radius='round' />
                            </View>
                            <View style={styles.stepContent}>
                                <Skeleton height={18} width={'60%'} {...skeletonProps} />
                                <View style={{ height: 8 }} />
                                <Skeleton height={14} width={'100%'} {...skeletonProps} />
                                <View style={{ height: 6 }} />
                                <Skeleton height={14} width={'90%'} {...skeletonProps} />
                            </View>
                        </View>
                    ))}
                </View>
            </Skeleton.Group>
            <View style={{ height: 50 }} />
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
    headerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: PADDING,
        paddingHorizontal: PADDING / 2
    },
    mediaContainer: {
        marginBottom: PADDING * 1.5,
        position: 'relative',
        backgroundColor: '#E0E0E0',
        borderRadius: 12,
        overflow: 'hidden'
    },
    playButtonOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleSection: {
        marginBottom: PADDING * 1.5,
        paddingHorizontal: PADDING / 2
    },
    section: {
        marginBottom: PADDING * 2,
        paddingHorizontal: PADDING / 2
    },
    howToHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: PADDING + 5
    },
    stepItem: {
        flexDirection: 'row',
        marginBottom: PADDING * 1.5,
        alignItems: 'flex-start'
    },
    stepIndicator: {
        alignItems: 'center',
        marginRight: PADDING,
        width: 30
    },
    stepContent: {
        flex: 1
    }
})

export default ExerciseDetailSkeleton
