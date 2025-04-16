// RootBottomSheet.tsx
import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import EntryScreen from './screens/EntryScreen'

type Flow = 'entry' | 'editProfile' | 'settings' | 'support'

const RootBottomSheet = () => {
    const [currentFlow, setCurrentFlow] = useState<Flow | string>('entry')

    const renderCurrentFlow = () => {
        switch (currentFlow) {
            case 'entry':
                return <EntryScreen onNavigate={setCurrentFlow} />
        }
    }

    return <View style={styles.wrapper}>{renderCurrentFlow()}</View>
}

export default RootBottomSheet

const styles = StyleSheet.create({
    wrapper: {
        padding: 20
    }
})
