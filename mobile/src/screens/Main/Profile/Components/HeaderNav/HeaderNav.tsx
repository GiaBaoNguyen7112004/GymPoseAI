import { View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavigationBar from '@/components/NavigationBar'

interface Props {
    isScrolled: boolean
    onBack: () => void
}

const HeaderNav = ({ isScrolled, onBack }: Props) => (
    <SafeAreaView style={[styles.navBar, isScrolled && styles.navBarScrolled]}>
        <NavigationBar title='Profile' callback={onBack} />
    </SafeAreaView>
)

const styles = StyleSheet.create({
    navBar: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'transparent'
    },
    navBarScrolled: {
        borderBottomColor: '#E5E5E5'
    }
})

export default HeaderNav
