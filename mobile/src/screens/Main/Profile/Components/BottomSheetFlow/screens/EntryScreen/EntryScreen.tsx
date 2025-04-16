// EntryScreen.tsx
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const EntryScreen = ({ onNavigate }: { onNavigate: (flow: string) => void }) => {
    return (
        <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>What do you want to do?</Text>
            <TouchableOpacity onPress={() => onNavigate('editProfile')}>
                <Text>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onNavigate('settings')}>
                <Text>App Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onNavigate('support')}>
                <Text>Contact Support</Text>
            </TouchableOpacity>
        </View>
    )
}

export default EntryScreen
