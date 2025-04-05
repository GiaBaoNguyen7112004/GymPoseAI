import React, { useRef, useState } from 'react'
import GradientButton from '@/src/components/GradientButton'
import Icon from '@/src/components/Icon'
import NavigationBar from '@/src/components/NavigationBar'
import TextGradient from '@/src/components/TextGradient'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Switch from '@/src/components/Switch'

function Profile() {
    const _onBackScreen = () => {}

    const [switchValue, setSwitchValue] = useState(false)

    const handleSwitchChange = (newValue: boolean) => {
        setSwitchValue(newValue)
    }
    const switchRef = useRef(null)
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <NavigationBar title='Profile' callback={_onBackScreen} />
            </View>
            <View style={styles.ProfileWrapper}>
                <View style={styles.ProfileHeader}>
                    <View style={styles.profile__avatar}>
                        <Icon name='workout1' size={34} />
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
            <View style={styles.menuSettingWrapper}>
                <View style={styles.menuSettingItem}>
                    <Text style={styles.menuSetting__heading}>Account</Text>
                    <TouchableOpacity style={styles.menuSetting__btn}>
                        <Icon name='profileGradientOuline' size={12} />
                        <Text style={styles.setting__label}>Personal Data</Text>
                        <Icon name='arrowRightGray' size={18} />
                    </TouchableOpacity>
                </View>
                <View style={styles.menuSettingItem}>
                    <Text style={styles.menuSetting__heading}>Notification</Text>
                    <TouchableOpacity style={styles.menuSetting__btn} onPress={() => handleSwitchChange(!switchValue)}>
                        <Icon name='bellGradientOline' size={12} />
                        <Text style={styles.setting__label}>Pop-up Notification</Text>
                        <Switch value={switchValue} onValueChange={handleSwitchChange} ref={switchRef} />
                    </TouchableOpacity>
                </View>
                <View style={styles.menuSettingItem}>
                    <Text style={styles.menuSetting__heading}>Other</Text>
                    <TouchableOpacity style={styles.menuSetting__btn}>
                        <Icon name='messageGradientOuline' size={12} />
                        <Text style={styles.setting__label}>Contact Us</Text>
                        <Icon name='arrowRightGray' size={18} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuSetting__btn}>
                        <Icon name='shieldGradientOuline' size={12} />
                        <Text style={styles.setting__label}>Privacy Policy</Text>
                        <Icon name='arrowRightGray' size={18} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuSetting__btn}>
                        <Icon name='settingGradientOuline' size={12} />
                        <Text style={styles.setting__label}>Settings</Text>
                        <Icon name='arrowRightGray' size={18} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Profile
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
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
    },
    menuSettingWrapper: {
        marginTop: 30,
        rowGap: 15,
        alignSelf: 'center',
        width: '90%',
        flex: 1
    },
    menuSettingItem: {
        padding: 20,
        shadowColor: 'rgba(29, 22, 23, 0.07)',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 40,
        elevation: 10,
        backgroundColor: '#fff',
        borderRadius: 16,
        minHeight: 99,
        width: '100%'
    },
    menuSetting__heading: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 24,
        color: '#1D1617',
        marginBottom: 10
    },
    menuSetting__btn: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 5,
        flexShrink: 0
    },
    setting__label: {
        flex: 1,
        fontSize: 14,
        lineHeight: 21,
        fontWeight: '400',
        color: '#7B6F72',
        marginLeft: 10
    }
})
