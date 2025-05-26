import React, { memo } from 'react'
import { StyleSheet, Platform } from 'react-native'
import LottieView from 'lottie-react-native'
import ViewLinerGradient from '@/components/ViewLinerGradient'

const HeaderBanner = () => (
    <ViewLinerGradient
        style={styles.bannerWrapper}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={['#E6F0FA', '#FFFFFF']}
    >
        <LottieView
            source={require('@/assets/animations/workout_summary_history.json')}
            autoPlay
            loop
            style={styles.banner}
        />
    </ViewLinerGradient>
)

const styles = StyleSheet.create({
    bannerWrapper: {
        paddingTop: 70,
        paddingBottom: 20,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4
            },
            android: {
                elevation: 2
            }
        })
    },
    banner: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        height: 130,
        marginBottom: 10
    }
})

export default memo(HeaderBanner)
