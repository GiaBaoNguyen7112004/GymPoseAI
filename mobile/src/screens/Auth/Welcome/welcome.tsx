import React, { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import GradientButton from '@/components/GradientButton'
import MyIcon from '@/components/Icon'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants/devices.constant'
import { RootStackScreenProps } from '@/navigation/types'
import useUserData from '@/hooks/useUserData'
import useNavigationState from '@/hooks/useNavigationState'

const WelcomeScreen = ({ navigation }: RootStackScreenProps<'Welcome'>) => {
    const { isNavigating } = useNavigationState(navigation)
    const { userData } = useUserData()

    const isProfileComplete = useMemo(() => Boolean(userData?.isProfileComplete), [userData])

    const navigateToNextScreen = (isProfileComplete: boolean) => {
        if (isProfileComplete) {
            navigation.replace('MainTab', {
                screen: 'Home'
            })
        } else {
            navigation.replace('CompleteProfile')
        }
    }

    const navigateBasedOnProfileCompletion = () => {
        navigateToNextScreen(isProfileComplete)
    }

    return (
        <SafeAreaView style={styles.flex}>
            <View style={styles.container}>
                <View style={styles.topWrapper}>
                    <MyIcon name='welcomeIcon' size={277} style={styles.banner} />
                    <View style={styles.textWrapper}>
                        <Text style={styles.heading}>Welcome, {userData?.first_name}</Text>
                        <Text style={styles.desc}>You are all set now, let’s reach your goals together with us</Text>
                    </View>
                </View>

                <GradientButton
                    style={styles.btn}
                    Square
                    onPress={navigateBasedOnProfileCompletion}
                    isLoading={isNavigating}
                >
                    <Text style={styles.textInnerBtn}>Go To Home</Text>
                </GradientButton>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        height: SCREEN_HEIGHT
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    topWrapper: {
        marginTop: 102,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textWrapper: {
        marginTop: 44,
        alignItems: 'center',
        maxWidth: 214
    },
    heading: {
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 30,
        color: '#1D1617'
    },
    desc: {
        marginTop: 5,
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 18,
        textAlign: 'center',
        color: '#7B6F72'
    },
    btn: {
        width: SCREEN_WIDTH * 0.9,
        marginBottom: 20
    },
    textInnerBtn: {
        color: '#FFF',
        fontWeight: '700',
        fontSize: 16
    },
    banner: {
        width: 375,
        height: 350,
        flexShrink: 0
    }
})

export default WelcomeScreen
