import { View, StyleSheet } from 'react-native'
import NavigationBar from '@/components/NavigationBar'
import { memo } from 'react'

interface headerProps {
    onBack: () => void
}

function Header({ onBack }: headerProps) {
    return (
        <View style={styles.header}>
            <NavigationBar title='Workout Tracker' callback={onBack} headingStyle={styles.headerTitle} />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700'
    }
})

export default memo(Header)
