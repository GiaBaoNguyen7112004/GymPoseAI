// components/workout-history/Header.tsx
import React, { memo } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import NavigationBar from '@/components/NavigationBar'

interface HeaderProps {
    onBack: () => void
}

const Header = ({ onBack }: HeaderProps) => {
    return (
        <SafeAreaView style={styles.header}>
            <NavigationBar
                title='Workout History'
                callback={onBack}
                buttonBackStyle={styles.buttonBack}
                headingStyle={styles.headerTitle}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 70,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700'
    },
    buttonBack: {
        backgroundColor: '#FFF'
    }
})

export default memo(Header)
