import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs'
import { Pressable, StyleSheet } from 'react-native'

function TabBarButton(props: BottomTabBarButtonProps) {
    const { onPress, children } = props
    return (
        <Pressable onPress={onPress} style={styles.tabButton}>
            {children}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    tabButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default TabBarButton
