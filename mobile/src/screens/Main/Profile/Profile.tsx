import { useRef, useState, Suspense } from 'react'
import { ScrollView, StyleSheet, View, ActivityIndicator } from 'react-native'

import AnimatedBottomSheetLayout, { AnimatedBottomSheetLayoutRef } from '@/components/layouts/AnimatedBottomSheetLayout'
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

function Profile({ navigation }: MainTabScreenProps<'Profile'>) {
    const bottomSheetRef = useRef<AnimatedBottomSheetLayoutRef>(null)
    const { openBottomSheet, closeBottomSheet } = useBottomSheetController(bottomSheetRef)

    const [isNotificationEnabled, setIsNotificationEnabled] = useState(false)
    const [logoutState, setLogoutState] = useState({ visible: false, loading: false })

    const { isScrolled, handleScroll } = useScrollListener()

    const openEditProfile = () =>
        openBottomSheet(
            <Suspense fallback={<ActivityIndicator />}>
                <PersonalDataFlow onClose={closeBottomSheet} />
            </Suspense>
        )

    const openPasswordAndSecurity = () =>
        openBottomSheet(
            <Suspense fallback={<ActivityIndicator />}>
                <PasswordAndSecurity onClose={closeBottomSheet} />
            </Suspense>
        )

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
                            <NotificationToggle value={isNotificationEnabled} onToggle={setIsNotificationEnabled} />
                        </SettingSection>

                        <SettingSection title='Other'>
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
                        </SettingSection>

                        <LogoutButton
                            isLoggingOut={logoutState.loading}
                            onPress={() => setLogoutState((prev) => ({ ...prev, visible: true }))}
                        />
                    </View>
                </ScrollView>

                <Modals
                    isLoggingOut={logoutState.loading}
                    isLogoutModalVisible={logoutState.visible}
                    setIsLoggingOut={(value) => setLogoutState((prev) => ({ ...prev, loading: value }))}
                    toggleModal={(visible) => setLogoutState((prev) => ({ ...prev, visible }))}
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
