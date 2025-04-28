import { LinearGradient } from 'expo-linear-gradient'
import MyIcon from '@/components/Icon'
import { IconName } from '@/constants/icon.constants'
import { COLOR_BRANDS } from '@/constants/common.constants'
import { StyleSheet } from 'react-native'
import { memo, useMemo } from 'react'
import { Pressable } from 'react-native'

interface AvatarWithIconProps {
    icon?: IconName
    colors?: [string, string, ...string[]]
    size: number
}

function AvatarWithIcon({ icon, colors, size }: AvatarWithIconProps) {
    const gradientColors = useMemo(() => colors || COLOR_BRANDS.primary, [colors])

    return (
        <Pressable>
            <LinearGradient
                colors={gradientColors}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 2, y: 0.5 }}
                locations={[0.8, 0.2]}
                style={[styles.workoutIconBackground, { width: size, height: size }]}
            >
                <MyIcon name={icon || 'movement1'} size={size * 0.88} />
            </LinearGradient>
        </Pressable>
    )
}

export default memo(AvatarWithIcon)

const styles = StyleSheet.create({
    workoutIconBackground: {
        borderRadius: 999,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F7F8F8'
    }
})
