import { StyleSheet, View } from 'react-native'
import { memo, ReactNode } from 'react'

interface MenuWrapperProps {
    children: ReactNode
}

function MenuWrapper({ children }: MenuWrapperProps) {
    return <View style={styles.menuContainer}>{children}</View>
}

export default memo(MenuWrapper)

const styles = StyleSheet.create({
    menuContainer: {
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#DDDADA'
    }
})
