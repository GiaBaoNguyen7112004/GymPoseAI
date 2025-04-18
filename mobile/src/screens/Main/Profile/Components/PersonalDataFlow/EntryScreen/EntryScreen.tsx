import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import useUserData from '@/hooks/useUserData'
import { SettingMenu } from '@/components/SettingMenu'
import { Flow, ScreenComponentProps } from '../routes.config'

const ProfileScreen = ({ onClose, onNavigate }: ScreenComponentProps) => {
    const { userData } = useUserData()

    const avatarSource = userData?.avatar ? { uri: userData.avatar } : require('@/assets/images/defaultAvatar.png')

    const fullName = `${userData?.first_name ?? ''} ${userData?.last_name ?? ''}`.trim()

    const handleNavigate = (flow: Flow) => {
        if (onNavigate) onNavigate(flow)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onClose}>
                    <Ionicons name='close' size={24} color='black' />
                </TouchableOpacity>
            </View>

            <View style={styles.profileSection}>
                <Image source={avatarSource} style={styles.profileImage} />
                <Text style={styles.profileName}>{fullName}</Text>
                <Text style={styles.profilePlatform}>FitnessX</Text>
            </View>

            <View style={styles.menuContainer}>
                <SettingMenu.MenuWrapper>
                    <SettingMenu.MenuItem title='Name' onPress={() => handleNavigate('editName')} />
                    <SettingMenu.MenuItem title='Profile' onPress={() => handleNavigate('editProfile')} />
                    <SettingMenu.MenuItem title='Avatar' onPress={() => handleNavigate('changeAvatar')} isLast />
                </SettingMenu.MenuWrapper>
            </View>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    header: {
        paddingVertical: 20,
        paddingHorizontal: 16
    },
    profileSection: {
        alignItems: 'center'
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#F7F8F8'
    },
    profileName: {
        fontSize: 18,
        fontWeight: '500',
        color: '#1D1617'
    },
    profilePlatform: {
        marginTop: 3,
        fontSize: 16,
        color: '#ADA4A5'
    },
    menuContainer: {
        marginTop: 16,
        marginHorizontal: 16
    }
})
