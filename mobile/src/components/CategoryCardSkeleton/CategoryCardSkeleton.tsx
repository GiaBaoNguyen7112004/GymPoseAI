import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Skeleton } from 'moti/skeleton'

const skeletonColorMode = 'light'

const CategoryCardSkeleton = () => {
    return (
        <View style={styles.cardContainer}>
            <Skeleton.Group show={true}>
                <View style={styles.contentWrapper}>
                    <View style={{ marginBottom: 8 }}>
                        <Skeleton height={16} width={'70%'} radius={4} colorMode={skeletonColorMode} />
                    </View>
                    <View style={{ marginBottom: 16 }}>
                        <Skeleton height={10} width={'90%'} radius={4} colorMode={skeletonColorMode} />
                    </View>
                </View>
                <View style={styles.imageWrapper}>
                    <Skeleton height={100} width={100} radius='round' colorMode={skeletonColorMode} />
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
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 16,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#F7F8F8'
    },
    contentWrapper: {
        flex: 1,
        marginRight: 16
    },
    imageWrapper: {}
})

export default CategoryCardSkeleton
