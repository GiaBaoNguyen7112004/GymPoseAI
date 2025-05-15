import MyIcon from '@/components/Icon'
import { LinearGradient } from 'expo-linear-gradient'
import { memo } from 'react'
import { StyleSheet } from 'react-native'

function TabBarSearchIcon() {
    return (
        <LinearGradient
            colors={['#92A3FD', '#9DCEFF']}
            start={{ x: 1, y: 0.5 }}
            end={{ x: 0, y: 0.5 }}
            style={styles.searchButton}
        >
            <MyIcon name='searchIcon' size={23} />
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    searchButton: {
        width: 60,
        height: 60,
        borderRadius: 999,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 33,
        shadowColor: 'rgba(149, 173, 254, 0.30)',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        elevation: 10
    }
})

export default TabBarSearchIcon
