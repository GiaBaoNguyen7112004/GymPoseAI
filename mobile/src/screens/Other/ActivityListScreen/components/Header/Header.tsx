import NavigationBar from '@/components/NavigationBar'
import { memo } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'

interface HeaderProps {
    goBackScreen: () => void
}

function Header({ goBackScreen }: HeaderProps) {
    return (
        <SafeAreaView style={styles.header}>
            <NavigationBar title='Daily Activity' callback={goBackScreen} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 1,
        shadowRadius: 3
    }
})

export default memo(Header)
