import { StyleSheet, Text, View } from 'react-native'
import MyIcon from '@/src/components/Icon'
import GradientButton from '@/src/components/GradientButton'
import TextGradient from '@/src/components/TextGradient'

function UserInfo() {
    return (
        <View style={styles.ProfileWrapper}>
            <View style={styles.ProfileHeader}>
                <View style={styles.profile__avatar}>
                    <MyIcon name='AbWorkout' size={34} />
                </View>
                <View style={styles.profile__content}>
                    <Text style={styles.profile_username}>Stefani Wong</Text>
                    <Text style={styles.profile_bio}>Lose a Fat Program</Text>
                </View>
                <GradientButton Square style={styles.Profile_btnEdit}>
                    <Text style={styles.btnEdit__text}>Edit</Text>
                </GradientButton>
            </View>
            <View style={styles.profile__row}>
                <View style={styles.profile__boxValue}>
                    <TextGradient text='180cm' textStyle={styles.profile__value} />
                    <Text style={styles.profile__label}>Height</Text>
                </View>
                <View style={styles.profile__boxValue}>
                    <TextGradient text='65kg' textStyle={styles.profile__value} />
                    <Text style={styles.profile__label}>Weight</Text>
                </View>
                <View style={styles.profile__boxValue}>
                    <TextGradient text='22yo' textStyle={styles.profile__value} />
                    <Text style={styles.profile__label}>Age</Text>
                </View>
            </View>
        </View>
    )
}

export default UserInfo

const styles = StyleSheet.create({
    ProfileWrapper: {
        marginTop: 35,
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DFE5FE'
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
        fontSize: 21,
        fontWeight: '500',
        color: '#1D1617'
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
        alignItems: 'center',
        columnGap: 15,
        rowGap: 15
    },
    profile__boxValue: {
        padding: 10,
        flex: 1,
        shadowColor: 'rgba(29, 22, 23, 0.07)',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 40,
        elevation: 10,
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
