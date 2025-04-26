import { Image, StyleSheet, Text, View } from 'react-native'
import GradientButton from '@/components/GradientButton'
import TextGradient from '@/components/TextGradient'
import { useContext } from 'react'
import { AppContext } from '@/Contexts/App.context'

interface UserInfoProps {
    editPress?: () => void
}

function UserInfo({ editPress }: UserInfoProps) {
    const { profile } = useContext(AppContext)

    const { first_name, last_name, height, weight, date_of_birth, avatar, email } = profile || {}

    const age = date_of_birth && ~~((Date.now() - new Date(date_of_birth).getTime()) / 3.15576e10)

    return (
        <View style={styles.ProfileWrapper}>
            <View style={styles.ProfileHeader}>
                <Image
                    style={styles.profile__avatar}
                    source={avatar ? { uri: avatar } : require('@/assets/images/defaultAvatar.png')}
                />
                <View style={styles.profile__content}>
                    <Text style={styles.profile_username}>{`${first_name ?? ''} ${last_name ?? ''}`.trim()}</Text>
                    <Text style={styles.profile_bio}>{email}</Text>
                </View>
                <GradientButton Square style={styles.Profile_btnEdit} onPress={editPress}>
                    <Text style={styles.btnEdit__text}>Edit</Text>
                </GradientButton>
            </View>

            <View style={styles.profile__row}>
                <ProfileValue label='Height' value={height ? `${height}cm` : '--'} />
                <ProfileValue label='Weight' value={weight ? `${weight}kg` : '--'} />
                <ProfileValue label='Age' value={age ? `${age}yo` : '--'} />
            </View>
        </View>
    )
}

const ProfileValue = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.profile__boxValue}>
        <TextGradient text={value} textStyle={styles.profile__value} />
        <Text style={styles.profile__label}>{label}</Text>
    </View>
)

export default UserInfo

const styles = StyleSheet.create({
    ProfileWrapper: {
        rowGap: 15,
        width: '90%',
        alignSelf: 'center'
    },
    ProfileHeader: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    profile__avatar: {
        width: 55,
        height: 55,
        borderRadius: 999,
        backgroundColor: '#DFE5FE',
        borderWidth: 1,
        borderColor: '#F7F8F8'
    },
    Profile_btnEdit: {
        width: 83,
        height: 30,
        position: 'relative'
    },
    btnEdit__text: {
        fontSize: 12,
        lineHeight: 18,
        fontWeight: '500',
        color: '#fff',
        textAlign: 'center',
        position: 'absolute'
    },
    profile__content: {
        marginLeft: 15,
        flex: 1
    },
    profile_username: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1D1617',
        lineHeight: 21
    },
    profile_bio: {
        fontSize: 12,
        lineHeight: 18,
        fontWeight: '400',
        color: '#7B6F72'
    },
    profile__row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        columnGap: 15
    },
    profile__boxValue: {
        padding: 10,
        flex: 1,
        shadowColor: 'rgba(29, 22, 23, 0.5)',
        shadowOffset: { width: 2, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 20,

        // Android shadow
        elevation: 8,
        backgroundColor: '#fff',
        height: 65,
        alignItems: 'center',
        borderRadius: 16
    },
    profile__value: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 21
    },
    profile__label: {
        marginTop: 5,
        fontSize: 12,
        lineHeight: 18,
        fontWeight: '400',
        color: '#7B6F72'
    }
})
