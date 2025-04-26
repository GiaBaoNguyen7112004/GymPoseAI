import { useContext, useRef, useState } from 'react'
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    NativeSyntheticEvent,
    NativeScrollEvent
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useMutation } from '@tanstack/react-query'

import NavigationBar from '@/components/NavigationBar'
import Switch from '@/components/Switch'
import AnimatedBottomSheetLayout, { AnimatedBottomSheetLayoutRef } from '@/components/layouts/AnimatedBottomSheetLayout'

import { MainTabScreenProps } from '@/navigation/types'
import { AppContext } from '@/Contexts/App.context'
import { authApi } from '@/services/rest'
import { showErrorAlert } from '@/utils/alert.util'

import UserInfo from './Components/UserInfo'
import SettingItem from './Components/SettingItem'
import PersonalDataFlow from '@/screens/Profile/PersonalDataFlow'
import PasswordAndSecurity from '@/screens/Profile/PasswordAndSecurity/PasswordAndSecurity'

function Profile({ navigation }: MainTabScreenProps<'Profile'>) {
    const { setAuthenticated } = useContext(AppContext)
    const bottomSheetRef = useRef<AnimatedBottomSheetLayoutRef>(null)

    const [isNotificationEnabled, setIsNotificationEnabled] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    const { mutateAsync: logout } = useMutation({ mutationFn: authApi.logout })

    const handleToggleNotification = (value: boolean) => {
        setIsNotificationEnabled(value)
    }

    const openEditProfile = () => {
        bottomSheetRef.current?.open(<PersonalDataFlow onClose={() => bottomSheetRef.current?.close()} />)
    }
    const openPasswordAndSecurity = () => {
        bottomSheetRef.current?.open(<PasswordAndSecurity onClose={() => bottomSheetRef.current?.close()} />)
    }
    const handleLogout = async () => {
        await logout(undefined, {
            onSuccess: () => setAuthenticated(false),
            onError: (errors) => showErrorAlert('default')
        })
    }

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = event.nativeEvent.contentOffset.y
        setIsScrolled(offsetY > 0)
    }

    return (
        <AnimatedBottomSheetLayout ref={bottomSheetRef}>
            <View style={styles.mainContent}>
                <SafeAreaView style={[styles.navBar, isScrolled && styles.navBarScrolled]}>
                    <NavigationBar title='Profile' callback={navigation.goBack} />
                </SafeAreaView>

                <ScrollView style={styles.scrollView} onScroll={handleScroll} scrollEventThrottle={16}>
                    <UserInfo editPress={openEditProfile} />

                    <View style={styles.sectionWrapper}>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Account</Text>
                            <SettingItem
                                icon='profileGradientOutline'
                                label='Personal Data'
                                onPress={openEditProfile}
                            />
                            <SettingItem
                                icon='LockGradientOutline'
                                label='Password and Security'
                                onPress={openPasswordAndSecurity}
                            />
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Notification</Text>
                            <SettingItem
                                icon='bellGradientOutline'
                                label='Pop-up Notification'
                                onPress={() => handleToggleNotification(!isNotificationEnabled)}
                                rightComponent={
                                    <Switch value={isNotificationEnabled} onValueChange={handleToggleNotification} />
                                }
                            />
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Other</Text>
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

                        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                            <Text style={styles.logoutText}>Log out</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </AnimatedBottomSheetLayout>
    )
}

export default Profile

const styles = StyleSheet.create({
    navBar: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'transparent'
    },
    navBarScrolled: {
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5'
    },
    scrollView: {
        flex: 1
    },
    mainContent: {
        flex: 1,
        backgroundColor: '#FFF',
        borderRadius: 30
    },
    sectionWrapper: {
        marginTop: 30,
        rowGap: 15,
        alignSelf: 'center',
        width: '90%',
        flex: 1
    },
    section: {
        padding: 20,
        backgroundColor: '#FFF',
        borderRadius: 16,
        minHeight: 99,
        width: '100%',
        shadowColor: 'rgba(29, 22, 23, 0.5)',
        shadowOffset: { width: 2, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 20,

        // Android shadow
        elevation: 8
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 24,
        color: '#1D1617',
        marginBottom: 10
    },
    logoutBtn: {
        backgroundColor: '#DDDADA',
        height: 40,
        borderRadius: 12,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoutText: {
        color: '#1D1617',
        fontSize: 14,
        fontWeight: '500'
    }
})
