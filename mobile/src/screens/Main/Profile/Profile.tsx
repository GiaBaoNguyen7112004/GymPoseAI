import { useState, Suspense, useCallback, useMemo } from 'react'
import { ScrollView, StyleSheet, View, ActivityIndicator, Alert } from 'react-native'

import AnimatedBottomSheetLayout from '@/components/layouts/AnimatedBottomSheetLayout'
import { MainTabScreenProps } from '@/navigation/types'
import useBottomSheetController from '@/hooks/useBottomSheetController'

import UserInfo from './Components/UserInfo'
import SettingItem from './Components/SettingItem'
import SettingSection from './Components/SettingSection'
import NotificationToggle from './Components/NotificationToggle'
import LogoutButton from './Components/LogoutButton'
import Modals from './Components/Modals'
import PasswordAndSecurity from '@/screens/Profile/PasswordAndSecurity'
import PersonalDataFlow from '@/screens/Profile/PersonalDataFlow'
import useNotification from '@/hooks/useNotificationContext'
import useBluetoothContext from '@/hooks/useBluetoothContext'
import AddDeviceButton from './Components/AddDeviceButton/AddDeviceButton'
import NavigationBarV2 from '@/components/NavigationBarV2'

function Profile({ navigation }: MainTabScreenProps<'Profile'>) {
    const { allowNotification, setAllowNotification } = useNotification()
    const { openBottomSheet, closeBottomSheet, bottomSheetRef } = useBottomSheetController()
    const { peripheralInfo, isConnecting, connectedDevice } = useBluetoothContext()

    const [logoutState, setLogoutState] = useState({ visible: false, loading: false })

    const isHasDevice = Boolean(peripheralInfo?.id)

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
        if (!isHasDevice) return navigation.navigate('BlueToothScan')
        Alert.alert(
            'Device Already Paired',
            'You have already paired a device. Please unpair the current device before adding a new one.',
            [{ text: 'OK' }]
        )
    }, [isHasDevice])

    const handleGotoDevice = useCallback(() => {
        navigation.navigate('MyDevice')
    }, [])
    const gotoSearchWorkout = useCallback(() => {
        navigation.navigate('Search')
    }, [navigation])
    const deviceStatus = useMemo(() => {
        if (isConnecting) return 'Connecting...'
        if (connectedDevice) return 'Connected'
        return "Couldn't connect"
    }, [isConnecting, connectedDevice])

    return (
        <AnimatedBottomSheetLayout ref={bottomSheetRef}>
            <View style={styles.mainContent}>
                <ScrollView
                    style={styles.scrollView}
                    scrollEventThrottle={16}
                    removeClippedSubviews
                    keyboardShouldPersistTaps='handled'
                >
                    <NavigationBarV2 title='Profile' searchAction={gotoSearchWorkout} containerStyle={styles.header} />

                    <UserInfo editPress={openEditProfile} />

                    <View style={styles.sectionWrapper}>
                        <SettingSection title='My devices'>
                            {isHasDevice && (
                                <SettingItem
                                    label={peripheralInfo?.name || 'GymBot'}
                                    subText={deviceStatus}
                                    onPress={handleGotoDevice}
                                />
                            )}
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
                                noBorderBottom
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
                                noBorderBottom
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
    header: {
        marginBottom: 10
    }
})

export default Profile
