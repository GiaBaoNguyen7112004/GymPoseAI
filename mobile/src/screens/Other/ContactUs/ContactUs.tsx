import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import NavigationBar from '@/components/NavigationBar'
import { RootStackScreenProps } from '@/navigation/types'
import { FontAwesome5 } from '@expo/vector-icons'

import { SOCIAL_LINKS, CONTACT, STORE_LINKS, APP } from '@/constants/contactUs'
import SocialButton from './Components/SocialButton'
import { openLink } from '@/utils/common.util'
import useScrollListener from '@/hooks/useScrollListener'

function ContactUsScreen({ navigation }: RootStackScreenProps<'ContactUs'>) {
    const { isScrolled, handleScroll } = useScrollListener()

    return (
        <View style={styles.screensWrapper}>
            <SafeAreaView style={[styles.header, isScrolled && styles.headerScrolled]}>
                <NavigationBar title='Contact & About Us' callback={navigation.goBack} />
            </SafeAreaView>
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                <Text style={styles.title}>FitnessX</Text>
                <Text style={styles.tagline}>Train smart. Live healthy.</Text>
                <View style={styles.divider} />

                <Text style={styles.description}>
                    FitnessX is an intelligent training assistant app that helps users of all levels track progress,
                    analyze posture, and optimize workout effectiveness.
                </Text>

                <Text style={styles.sectionTitle}>Connect With Us</Text>
                <View style={styles.socialContainer}>
                    <SocialButton
                        icon='instagram'
                        platform='Instagram'
                        handle='@fitnessx'
                        url={SOCIAL_LINKS.INSTAGRAM}
                    />
                    <SocialButton icon='facebook' platform='Facebook' handle='/fitnessx' url={SOCIAL_LINKS.FACEBOOK} />
                    <SocialButton icon='youtube' platform='TikTok' handle='@fitnessx' url={SOCIAL_LINKS.TIKTOK} />
                    <SocialButton icon='mail' platform='Email' handle={CONTACT.EMAIL} url={`mailto:${CONTACT.EMAIL}`} />
                </View>

                <Text style={styles.sectionTitle}>Get the App</Text>
                <TouchableOpacity
                    onPress={() => openLink(STORE_LINKS.APP_STORE)}
                    style={[styles.storeButton, styles.appleButton]}
                    activeOpacity={0.8}
                >
                    <FontAwesome5 name='apple' size={22} color='#fff' />
                    <View style={styles.storeTextGroup}>
                        <Text style={styles.storeSmallText}>Download on the</Text>
                        <Text style={styles.storeLargeText}>App Store</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => openLink(STORE_LINKS.GOOGLE_PLAY)}
                    style={[styles.storeButton, styles.googleButton]}
                    activeOpacity={0.8}
                >
                    <FontAwesome5 name='google-play' size={22} color='#4285F4' />
                    <View style={styles.storeTextGroup}>
                        <Text style={styles.googleTextSmall}>Get it on</Text>
                        <Text style={styles.googleTextLarge}>Google Play</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.versionContainer}>
                    <Text style={styles.versionText}>Version {APP.VERSION}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')}>
                        <Text style={styles.privacyText}>Privacy Policy</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    screensWrapper: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    header: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'transparent',
        backgroundColor: '#FFFFFF'
    },
    headerScrolled: {
        borderBottomColor: '#DDDADA'
    },
    container: {
        flex: 1,
        paddingHorizontal: 20
    },
    logoContainer: {
        alignItems: 'center'
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#007AFF',
        textAlign: 'center',
        marginTop: 10
    },
    tagline: {
        fontSize: 16,
        color: '#555555',
        textAlign: 'center',
        marginBottom: 15
    },
    divider: {
        height: 1,
        backgroundColor: '#EEEEEE',
        marginVertical: 20
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333333',
        marginBottom: 30,
        textAlign: 'center'
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 15,
        color: '#333333'
    },
    socialContainer: {
        marginBottom: 30
    },
    storeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 14,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginBottom: 15,
        justifyContent: 'center'
    },
    appleButton: {
        backgroundColor: '#000000'
    },
    googleButton: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#DADCE0'
    },
    storeTextGroup: {
        marginLeft: 12
    },
    storeSmallText: {
        color: '#FFFFFF',
        fontSize: 12
    },
    storeLargeText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600'
    },
    googleTextSmall: {
        color: '#5F6368',
        fontSize: 12
    },
    googleTextLarge: {
        color: '#3c4043',
        fontSize: 18,
        fontWeight: '600'
    },
    versionContainer: {
        marginTop: 20,
        marginBottom: 30,
        alignItems: 'center'
    },
    versionText: {
        fontSize: 14,
        color: '#999999',
        marginBottom: 5
    },
    privacyText: {
        fontSize: 14,
        color: '#007AFF',
        textDecorationLine: 'underline'
    }
})

export default ContactUsScreen
