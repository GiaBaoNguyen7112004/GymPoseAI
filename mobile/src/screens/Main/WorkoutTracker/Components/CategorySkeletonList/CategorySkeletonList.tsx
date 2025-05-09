import React, { memo } from 'react'
import CategoryCardSkeleton from '@/components/CategoryCardSkeleton'

interface CategorySkeletonListProps {
    count?: number
}

const CategorySkeletonList: React.FC<CategorySkeletonListProps> = ({ count = 2 }) => {
    return (
        <>
            {Array.from({ length: count }, (_, index) => (
                <CategoryCardSkeleton key={index} />
            ))}
        </>
    )
}

export default memo(CategorySkeletonList)
