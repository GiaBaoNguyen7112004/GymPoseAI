import NavigationBar from '@/components/NavigationBar'
import { memo } from 'react'
import { StyleSheet, View } from 'react-native'

interface HeaderProps {
    goBackScreen: () => void
}

function Header({ goBackScreen }: HeaderProps) {
    return (
        <View style={styles.header}>
            <NavigationBar title={'Workout Tracker'} callback={goBackScreen} headingStyle={styles.headerTitle} />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        marginTop: 10
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700'
    }
})

export default memo(Header)
