import React, { memo } from 'react'
import { View, ViewStyle } from 'react-native'
import ActivityCartSkeleton from '@/components/ActivityCartSkeleton'

interface LatestActivitySkeletonProps {
    count?: number
    containerStyle?: ViewStyle
}

const LatestActivitySkeleton = ({ count = 3, containerStyle }: LatestActivitySkeletonProps) => {
    return (
        <View style={containerStyle}>
            {Array.from({ length: count }).map((_, i) => (
                <ActivityCartSkeleton key={i} />
            ))}
        </View>
    )
}

export default memo(LatestActivitySkeleton)
