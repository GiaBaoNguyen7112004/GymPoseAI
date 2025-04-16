import React, { useRef, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavigationBar from '@/src/components/NavigationBar'
import Switch from '@/src/components/Switch'
import UserInfo from './Components/UserInfo'
import SettingItem from './Components/SettingItem'
import { MainTabScreenProps } from '@/src/navigation/types'

function Profile({ navigation }: MainTabScreenProps<'Profile'>) {
    const [isNotificationEnabled, setIsNotificationEnabled] = useState(false)
    const switchRef = useRef(null)

    const handleNotificationToggle = (newValue: boolean) => {
        setIsNotificationEnabled(newValue)
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.navBar}>
                <NavigationBar title='Profile' callback={navigation.goBack} />
            </SafeAreaView>

            <ScrollView style={styles.container}>
                <UserInfo />

                <View style={styles.settingWrapper}>
                    {/* Account Section */}
                    <View style={styles.settingSection}>
                        <Text style={styles.settingTitle}>Account</Text>
                        <SettingItem icon='profileGradientOutline' label='Personal Data' />
                        <SettingItem icon='LockGradientOutline' label='Password and Security' />
                    </View>

                    {/* Notification Section */}
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

                    {/* Other Section */}
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
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    navBar: {
        height: 70
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
    },
    bottomSheetContainer: {
        flex: 1,
        padding: 36,
        alignItems: 'center'
    }
})
