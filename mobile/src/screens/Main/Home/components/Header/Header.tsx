import { StyleSheet, Text, View } from 'react-native'
import { memo } from 'react'
import useUserData from '@/hooks/useUserData'
import CameraInfoButton from '../CameraInfoButton'

function Header() {
    const { userData } = useUserData()
    const fullName = `${userData?.first_name ?? ''} ${userData?.last_name ?? ''}`.trim()
    return (
        <View style={styles.header}>
            <View style={styles.textContainer}>
                <Text style={styles.subText}>Welcome Back,</Text>
                <Text style={styles.heading} numberOfLines={1}>
                    {fullName}
                </Text>
            </View>
            <CameraInfoButton />
        </View>
    )
}

export default memo(Header)

const styles = StyleSheet.create({
    header: {
        marginTop: 20,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textContainer: {
        flex: 1
    },
    subText: {
        color: '#ADA4A5',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 18
    },
    heading: {
        color: '#1D1617',
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 30,
        width: '90%'
    },
    button: {
        width: 40,
        height: 40,
        backgroundColor: '#F7F8F8',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
