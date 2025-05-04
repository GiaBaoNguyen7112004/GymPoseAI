import React from 'react'
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native'
import { Skeleton } from 'moti/skeleton'
import Home from '../../Home'

const windowWidth = Dimensions.get('window').width
const PADDING = 16

const HomeSkeleton = ({ show = true }: { show?: boolean }) => {
    const skeletonColorMode: 'light' | 'dark' = 'light'
    const skeletonRectProps = { colorMode: skeletonColorMode, radius: 6 }
    const skeletonCircleProps = { colorMode: skeletonColorMode, radius: 'round' as 'round' }

    return (
        <ScrollView style={styles.screen} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <Skeleton.Group show={show}>
                <View style={styles.header}>
                    <View style={styles.headerTextContainer}>
                        <Skeleton height={14} width={'30%'} {...skeletonRectProps} />
                        <View style={{ height: 6 }} />
                        <Skeleton height={28} width={'60%'} {...skeletonRectProps} radius={8} />
                    </View>
                    <Skeleton height={36} width={36} {...skeletonCircleProps} />
                </View>

                <View style={styles.cardLarge}>
                    <View style={{ flex: 1, paddingRight: PADDING }}>
                        <Skeleton height={20} width={'70%'} {...skeletonRectProps} />
                        <View style={{ height: 8 }} />
                        <Skeleton height={16} width={'90%'} {...skeletonRectProps} />
                        <View style={{ height: 15 }} />
                        <Skeleton height={35} width={100} {...skeletonRectProps} radius={10} />
                    </View>
                    <Skeleton height={70} width={70} {...skeletonCircleProps} />
                </View>

                <View style={[styles.cardSimple, styles.rowBetween]}>
                    <Skeleton height={20} width={'40%'} {...skeletonRectProps} />
                    <Skeleton height={30} width={80} {...skeletonRectProps} radius={10} />
                </View>

                <View style={styles.sectionTitle}>
                    <Skeleton height={22} width={'50%'} {...skeletonRectProps} />
                </View>

                <View style={styles.cardActivity}>
                    <View style={styles.rowBetween}>
                        <View>
                            <Skeleton height={18} width={80} {...skeletonRectProps} />
                            <View style={{ height: 6 }} />
                            <Skeleton height={24} width={100} {...skeletonRectProps} />
                        </View>
                        <Skeleton height={25} width={70} {...skeletonRectProps} radius={12} />
                    </View>
                    <View style={{ height: 15 }} />
                    <Skeleton height={60} width={'100%'} {...skeletonRectProps} />
                </View>
            </Skeleton.Group>
            <View style={{ height: 50 }} />
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
    headerTextContainer: {},
    cardLarge: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: PADDING * 1.2,
        marginBottom: PADDING * 1.5,
        alignItems: 'center'
    },
    cardSimple: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        paddingVertical: PADDING,
        paddingHorizontal: PADDING * 1.2,
        marginBottom: PADDING * 1.5
    },
    sectionTitle: {
        marginBottom: PADDING * 0.75
    },
    cardActivity: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: PADDING * 1.2,
        marginBottom: PADDING * 1.5
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    bottomRow: {
        flexDirection: 'row'
    },
    cardBottom: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: PADDING,
        shadowColor: '#C0C8E0',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3
    },
    waterCard: {
        flex: 1,
        marginRight: PADDING / 2,
        height: 260
    },
    rightColumn: {
        flex: 1,
        marginLeft: PADDING / 2
    },
    rightCard: {}
})

export default HomeSkeleton
