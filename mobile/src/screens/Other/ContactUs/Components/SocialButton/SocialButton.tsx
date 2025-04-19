import { openLink } from '@/utils/common.util'
import { Feather } from '@expo/vector-icons'
import { Linking, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native'

interface SocialButtonProps {
    icon: string
    platform: string
    handle: string
    url: string
}

function SocialButton({ icon, platform, handle, url }: SocialButtonProps) {
    return (
        <TouchableOpacity style={styles.socialButton} onPress={() => openLink(url)} activeOpacity={0.7}>
            <Feather name={icon as any} size={20} color='#007AFF' style={styles.socialIcon} />
            <View style={styles.socialTextContainer}>
                <Text style={styles.socialPlatform}>{platform}</Text>
                <Text style={styles.socialHandle}>{handle}</Text>
            </View>
            <Feather name='chevron-right' size={20} color='#A0A0A0' />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        padding: 15,
        borderRadius: 12,
        marginBottom: 10
    },
    socialIcon: {
        marginRight: 15
    },
    socialTextContainer: {
        flex: 1
    },
    socialPlatform: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333333'
    },
    socialHandle: {
        fontSize: 14,
        color: '#666666'
    }
})

export default SocialButton
