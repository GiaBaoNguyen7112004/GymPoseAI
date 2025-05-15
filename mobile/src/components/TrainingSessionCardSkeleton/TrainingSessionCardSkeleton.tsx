import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Skeleton } from 'moti/skeleton'

const WorkoutCardSkeleton = () => {
    const skeletonColorMode = 'light'

    return (
        <View style={styles.cardContainer}>
            <Skeleton.Group show={true}>
                <View style={styles.iconWrapper}>
                    <Skeleton height={55} width={55} radius='round' colorMode={skeletonColorMode} />
                </View>

                <View style={styles.contentWrapper}>
                    <View style={{ marginBottom: 12 }}>
                        <Skeleton height={14} width={'65%'} radius={5} colorMode={skeletonColorMode} />
                    </View>
                    <Skeleton height={8} width={'100%'} radius={5} colorMode={skeletonColorMode} />
                </View>

                <View style={styles.chevronWrapper}>
                    <Skeleton height={30} width={30} radius='round' colorMode={skeletonColorMode} />
                </View>
            </Skeleton.Group>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        paddingVertical: 15,
        paddingHorizontal: 12,
        marginBottom: 15,
        shadowColor: '#B0BEC5',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 3,
        height: 80
    },
    iconWrapper: {
        marginRight: 12
    },
    contentWrapper: {
        flex: 1,
        justifyContent: 'center'
    },
    chevronWrapper: {
        marginLeft: 12
    }
})

export default WorkoutCardSkeleton
