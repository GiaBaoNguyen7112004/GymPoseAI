import NavigationBar from '@/components/NavigationBar'
import { memo } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'

interface HeaderProps {
    handleBack: () => void
    headerTitle?: string
    handleMorePress?: () => void
}

function Header({ handleBack, headerTitle, handleMorePress }: HeaderProps) {
    return (
        <SafeAreaView style={styles.navbar}>
            <NavigationBar
                title={headerTitle ? headerTitle : 'Summary'}
                callback={handleBack}
                handleMorePress={handleMorePress}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    navbar: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF'
    }
})

export default memo(Header)
