import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { FlowProps } from '../../PersonalDataFlow'
import { User } from '@/types/user.type'

interface ProfileScreenProps extends FlowProps {
    userInfo: User | null
}

const MenuItem = ({ title, onPress, isLast }: { title: string; onPress: () => void; isLast?: boolean }) => (
    <TouchableOpacity style={[styles.menuItem, isLast && styles.menuItemLast]} onPress={onPress}>
        <Text style={styles.menuText}>{title}</Text>
        <Ionicons name='chevron-forward' size={20} color='#888' />
    </TouchableOpacity>
)

const ProfileScreen = ({ onNavigate, userInfo, onGoBack }: ProfileScreenProps) => {
    const fullName = `${userInfo?.first_name ?? ''} ${userInfo?.last_name ?? ''}`.trim()

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onGoBack}>
                    <Ionicons name='close' size={24} color='black' />
                </TouchableOpacity>
            </View>

            <View style={styles.profileSection}>
                <Image
                    source={userInfo?.avatar ? { uri: userInfo.avatar } : require('@/assets/images/defaultAvatar.png')}
                    style={styles.profileImage}
                />
                <Text style={styles.profileName}>{fullName}</Text>
                <Text style={styles.profilePlatform}>FitnessX</Text>
            </View>

            <View style={styles.menuContainer}>
                <MenuItem title='Name' onPress={() => onNavigate('editName')} />
                <MenuItem title='Profile' onPress={() => onNavigate('editProfile')} />
                <MenuItem title='Avatar' onPress={() => onNavigate('changeAvatar')} isLast />
            </View>
        </View>
    )
}

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
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginTop: 16,
        marginHorizontal: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#DDDADA'
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#DDDADA'
    },
    menuItemLast: {
        borderBottomWidth: 0
    },
    menuText: {
        fontSize: 16,
        color: '#1D1617',
        fontWeight: '500'
    }
})

export default ProfileScreen
