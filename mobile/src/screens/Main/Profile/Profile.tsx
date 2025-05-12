import { useState, Suspense, useCallback } from 'react'
import { ScrollView, StyleSheet, View, ActivityIndicator, Pressable } from 'react-native'

import AnimatedBottomSheetLayout from '@/components/layouts/AnimatedBottomSheetLayout'
import { MainTabScreenProps } from '@/navigation/types'
import useScrollListener from '@/hooks/useScrollListener'
import useBottomSheetController from '@/hooks/useBottomSheetController'

import UserInfo from './Components/UserInfo'
import SettingItem from './Components/SettingItem'
import HeaderNav from './Components/HeaderNav'
import SettingSection from './Components/SettingSection'
import NotificationToggle from './Components/NotificationToggle'
import LogoutButton from './Components/LogoutButton'
import Modals from './Components/Modals'
import PasswordAndSecurity from '@/screens/Profile/PasswordAndSecurity'
import PersonalDataFlow from '@/screens/Profile/PersonalDataFlow'
import useNotification from '@/hooks/useNotificationContext'
import useBluetoothContext from '@/hooks/useBluetoothContext'
import AddDeviceButton from './Components/AddDeviceButton/AddDeviceButton'

function Profile({ navigation }: MainTabScreenProps<'Profile'>) {
    const { allowNotification, setAllowNotification } = useNotification()
    const { openBottomSheet, closeBottomSheet, bottomSheetRef } = useBottomSheetController()
    const { peripheralInfo } = useBluetoothContext()

    const [logoutState, setLogoutState] = useState({ visible: false, loading: false })

    const { isScrolled, handleScroll } = useScrollListener()

    const openEditProfile = useCallback(() => {
        openBottomSheet(
            <Suspense fallback={<ActivityIndicator />}>
                <PersonalDataFlow onClose={closeBottomSheet} />
            </Suspense>
        )
    }, [openBottomSheet, closeBottomSheet])

    const openPasswordAndSecurity = useCallback(() => {
        openBottomSheet(
            <Suspense fallback={<ActivityIndicator />}>
                <PasswordAndSecurity onClose={closeBottomSheet} />
            </Suspense>
        )
    }, [openBottomSheet, closeBottomSheet])

    const handleContactUs = useCallback(() => {
        navigation.navigate('ContactUs')
    }, [navigation])

    const handlePrivacyPolicy = useCallback(() => {
        navigation.navigate('PrivacyPolicy')
    }, [navigation])

    const handleLogoutPress = useCallback(() => {
        setLogoutState((prev) => ({ ...prev, visible: true }))
    }, [])

    const handleSetIsLoggingOut = useCallback((value: boolean) => {
        setLogoutState((prev) => ({ ...prev, loading: value }))
    }, [])

    const handleToggleModal = useCallback((visible: boolean) => {
        setLogoutState((prev) => ({ ...prev, visible }))
    }, [])

    const handleGotoAddDevice = useCallback(() => {
        navigation.navigate('MyDevice')
    }, [])

    const handleGotoDevice = useCallback(() => {
        navigation.navigate('MyDevice')
    }, [])

    return (
        <AnimatedBottomSheetLayout ref={bottomSheetRef}>
            <View style={styles.mainContent}>
                <HeaderNav isScrolled={isScrolled} onBack={navigation.goBack} />

                <ScrollView
                    style={styles.scrollView}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    removeClippedSubviews
                    keyboardShouldPersistTaps='handled'
                >
                    <UserInfo editPress={openEditProfile} />

                    <View style={styles.sectionWrapper}>
                        <SettingSection title='My devices'>
                            {peripheralInfo && <SettingItem label={peripheralInfo.name} onPress={handleGotoDevice} />}
                            <AddDeviceButton onPress={handleGotoAddDevice} />
                        </SettingSection>
                        <SettingSection title='Account'>
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
                        </SettingSection>

                        <SettingSection title='Notification'>
                            <NotificationToggle value={allowNotification} onToggle={setAllowNotification} />
                        </SettingSection>

                        <SettingSection title='Other'>
                            <SettingItem icon='messageGradientOutline' label='Contact Us' onPress={handleContactUs} />
                            <SettingItem
                                icon='shieldGradientOutline'
                                label='Privacy Policy'
                                onPress={handlePrivacyPolicy}
                            />
                        </SettingSection>

                        <LogoutButton isLoggingOut={logoutState.loading} onPress={handleLogoutPress} />
                    </View>
                </ScrollView>

                <Modals
                    isLoggingOut={logoutState.loading}
                    isLogoutModalVisible={logoutState.visible}
                    setIsLoggingOut={handleSetIsLoggingOut}
                    toggleModal={handleToggleModal}
                />
            </View>
        </AnimatedBottomSheetLayout>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        paddingTop: 10
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
    }
})

export default Profile
