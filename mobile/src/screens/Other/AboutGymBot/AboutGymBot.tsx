import React, { useCallback } from 'react'
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { RootStackScreenProps } from '@/navigation/types'
import useBluetoothContext from '@/hooks/useBluetoothContext'

const { width } = Dimensions.get('window')

const AboutGymBotScreen = ({ navigation }: RootStackScreenProps<'AboutGymBot'>) => {
    const { peripheralInfo } = useBluetoothContext()
    const handleCTAPress = useCallback(() => {
        if (peripheralInfo?.ip_address) {
            navigation.navigate('MyDevice')
        } else {
            navigation.navigate('BlueToothScan')
        }
    }, [peripheralInfo?.ip_address])

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
                <Ionicons name='chevron-back' size={28} color='#fff' />
            </TouchableOpacity>
            <View style={styles.heroContainer}>
                <Image source={require('@/assets/images/hero_gym.jpg')} style={styles.heroImage} resizeMode='cover' />
                <View style={styles.heroOverlay}>
                    <Text style={styles.heroTitle}>GymBot</Text>
                    <Text style={styles.heroSubtitle}>Your AI Fitness Device</Text>
                </View>
            </View>

            <View style={styles.contentContainer}>
                <Text style={styles.sectionTitle}>What is GymBot?</Text>
                <Text style={styles.description}>
                    GymBot is an AI-powered training device that helps you work out smarter with motion tracking and
                    voice guidance.
                </Text>

                <View style={styles.featureContainer}>
                    <View style={styles.featureCard}>
                        <View style={styles.featureIconContainer}>
                            <Ionicons name='camera-outline' size={32} color='#4A90E2' />
                        </View>
                        <View style={styles.featureTextContainer}>
                            <Text style={styles.featureTitle}>Motion Tracking</Text>
                            <Text style={styles.featureText}>
                                Built-in camera analyzes your form in real time to improve every move.
                            </Text>
                        </View>
                    </View>

                    <View style={styles.featureCard}>
                        <View style={styles.featureIconContainer}>
                            <Ionicons name='volume-medium-outline' size={32} color='#4A90E2' />
                        </View>
                        <View style={styles.featureTextContainer}>
                            <Text style={styles.featureTitle}>Voice Guidance</Text>
                            <Text style={styles.featureText}>
                                Get AI-powered audio cues to keep you focused and motivated.
                            </Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={styles.ctaButton} activeOpacity={0.8} onPress={handleCTAPress}>
                    <Text style={styles.ctaButtonText}>Try GymBot Now</Text>
                    <Ionicons name='arrow-forward-outline' size={20} color='#FFFFFF' style={{ marginLeft: 8 }} />
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA'
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 16,
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 30,
        padding: 6
    },
    heroContainer: {
        width: '100%',
        height: width * 0.7,
        position: 'relative',
        backgroundColor: '#000'
    },
    heroImage: {
        width: '100%',
        height: '100%'
    },
    heroOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    heroTitle: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
        textAlign: 'center'
    },
    heroSubtitle: {
        fontSize: 18,
        fontWeight: '300',
        color: '#fff',
        textAlign: 'center'
    },
    contentContainer: {
        padding: 24
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#212529',
        marginBottom: 16,
        textAlign: 'center'
    },
    description: {
        fontSize: 16,
        color: '#6C757D',
        lineHeight: 24,
        marginBottom: 32,
        textAlign: 'center'
    },
    featureContainer: {
        gap: 20
    },
    featureCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#DDDADA',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3
    },
    featureIconContainer: {
        marginRight: 16,
        backgroundColor: 'rgba(74, 144, 226, 0.1)',
        padding: 12,
        borderRadius: 50
    },
    featureTextContainer: {
        flex: 1
    },
    featureTitle: {
        fontSize: 17,
        fontWeight: '600',
        color: '#212529',
        marginBottom: 4
    },
    featureText: {
        fontSize: 14,
        color: '#6C757D',
        lineHeight: 20
    },
    ctaButton: {
        marginTop: 32,
        backgroundColor: '#E6F0FA',
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 24,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        shadowColor: '#A0C4FF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 3
    },
    ctaButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1D4ED8'
    }
})

export default AboutGymBotScreen
