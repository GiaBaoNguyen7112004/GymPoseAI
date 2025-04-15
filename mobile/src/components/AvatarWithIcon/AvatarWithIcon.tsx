import { LinearGradient } from 'expo-linear-gradient'
import MyIcon from '@/src/components/Icon'
import { IconName } from '@/src/constants/icon.constants'
import { COLOR_BRANDS } from '@/src/constants/common.constants'
import { StyleSheet } from 'react-native'
interface AvatarWithIconProps {
    icon?: IconName
    colors?: [string, string, ...string[]]
    size: number
}

function AvatarWithIcon({ icon, colors, size }: AvatarWithIconProps) {
    return (
        <LinearGradient
            colors={colors || COLOR_BRANDS.primary}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 2, y: 0.5 }}
            locations={[0.8, 0.2]}
            style={[styles.workoutIconBackground, { width: size, height: size }]}
        >
            <MyIcon name={icon || 'movement1'} size={size * 0.88} />
        </LinearGradient>
    )
}

export default AvatarWithIcon

const styles = StyleSheet.create({
    workoutIconBackground: {
        borderRadius: 999,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F7F8F8'
    }
})
