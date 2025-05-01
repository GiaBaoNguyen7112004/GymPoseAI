import { memo } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native'

interface Props {
    isLoggingOut: boolean
    onPress: () => void
}

const LogoutButton = ({ isLoggingOut, onPress }: Props) => (
    <Pressable style={styles.logoutBtn} onPress={onPress} disabled={isLoggingOut}>
        {isLoggingOut ? (
            <ActivityIndicator size='small' color='#555' />
        ) : (
            <Text style={styles.logoutText}>Log out</Text>
        )}
    </Pressable>
)

const styles = StyleSheet.create({
    logoutBtn: {
        backgroundColor: '#F5F5F5',
        height: 44,
        borderRadius: 12,
        marginTop: 10,
        marginBottom: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoutText: {
        color: '#555',
        fontSize: 15,
        fontWeight: '500'
    }
})

export default memo(LogoutButton)
