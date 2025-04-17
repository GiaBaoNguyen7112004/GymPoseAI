import { useRef, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavigationBar from 'src/components/NavigationBar'
import Switch from 'src/components/Switch'
import UserInfo from './Components/UserInfo'
import SettingItem from './Components/SettingItem'
import { MainTabScreenProps } from '@/navigation/types'
import AnimatedBottomSheetLayout, { AnimatedBottomSheetLayoutRef } from '@/components/layouts/AnimatedBottomSheetLayout'
import PersonalDataFlow from './Components/PersonalDataFlow'

function Profile({ navigation }: MainTabScreenProps<'Profile'>) {
    const bottomSheetModalRef = useRef<AnimatedBottomSheetLayoutRef>(null)
    const switchRef = useRef(null)

    const [isNotificationEnabled, setIsNotificationEnabled] = useState(false)

    const handleNotificationToggle = (value: boolean) => {
        setIsNotificationEnabled(value)
    }

    const handleEditProfilePress = () => {
        bottomSheetModalRef.current?.open(<PersonalDataFlow />)
    }

    return (
        <AnimatedBottomSheetLayout ref={bottomSheetModalRef}>
            <View style={styles.mainContentWrapper}>
                <SafeAreaView style={styles.navBar}>
                    <NavigationBar title='Profile' callback={navigation.goBack} />
                </SafeAreaView>

                <ScrollView style={styles.scrollView}>
                    <UserInfo editPress={handleEditProfilePress} />

                    <View style={styles.settingWrapper}>
                        <View style={styles.settingSection}>
                            <Text style={styles.settingTitle}>Account</Text>
                            <SettingItem icon='profileGradientOutline' label='Personal Data' />
                            <SettingItem icon='LockGradientOutline' label='Password and Security' />
                        </View>

                        <View style={styles.settingSection}>
                            <Text style={styles.settingTitle}>Notification</Text>
                            <SettingItem
                                icon='bellGradientOutline'
                                label='Pop-up Notification'
                                onPress={() => handleNotificationToggle(!isNotificationEnabled)}
                                rightComponent={
                                    <Switch
                                        value={isNotificationEnabled}
                                        onValueChange={handleNotificationToggle}
                                        ref={switchRef}
                                    />
                                }
                            />
                        </View>

                        <View style={styles.settingSection}>
                            <Text style={styles.settingTitle}>Other</Text>
                            <SettingItem
                                icon='messageGradientOutline'
                                label='Contact Us'
                                onPress={() => navigation.navigate('ContactUs')}
                            />
                            <SettingItem
                                icon='shieldGradientOutline'
                                label='Privacy Policy'
                                onPress={() => navigation.navigate('PrivacyPolicy')}
                            />
                            <SettingItem
                                icon='settingGradientOutline'
                                label='Settings'
                                onPress={() => navigation.navigate('Setting')}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </AnimatedBottomSheetLayout>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentWrapper: {
        flex: 1
    },
    navBar: {
        justifyContent: 'center'
    },
    scrollView: {
        flex: 1
    },
    mainContentWrapper: {
        flex: 1,
        backgroundColor: '#FFF',
        borderRadius: 30
    },
    settingWrapper: {
        marginTop: 30,
        rowGap: 15,
        alignSelf: 'center',
        width: '90%',
        flex: 1
    },
    settingSection: {
        padding: 20,
        backgroundColor: '#FFF',
        borderRadius: 16,
        minHeight: 99,
        width: '100%',
        shadowColor: 'rgba(29, 22, 23, 0.07)',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 40,
        elevation: 10
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 24,
        color: '#1D1617',
        marginBottom: 10
    }
})
