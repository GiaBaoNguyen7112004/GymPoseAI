import { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Ionicons } from '@expo/vector-icons'
import { ImageEditor, ImageData } from 'expo-crop-image'
import GradientButton from '@/components/GradientButton'
import { ScreenComponentProps } from '../routes.config'

export default function PreviewAvatarScreen({ onGoBack }: ScreenComponentProps) {
    const [avatarUri, setAvatarUri] = useState<string | null>(null)
    const [isEditorVisible, setEditorVisible] = useState(false)

    const requestPermissionAndPickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
            alert('Permission denied to access photos')
            return
        }

        const result = await ImagePicker.launchImageLibraryAsync({ quality: 1 })
        if (!result.canceled && result.assets.length > 0) {
            setAvatarUri(result.assets[0].uri)
        }
    }

    const handleEditPress = () => {
        avatarUri ? setEditorVisible(true) : requestPermissionAndPickImage()
    }

    const handleSavePress = () => {
        if (avatarUri) {
            console.log('Avatar saved:', avatarUri)
            const formData = new FormData()
            // append avatar to formData if needed
        }
    }

    const handleCropComplete = (data: ImageData) => {
        setEditorVisible(false)
        setAvatarUri(data.uri)
    }

    useEffect(() => {
        if (!avatarUri) {
            requestPermissionAndPickImage()
        }
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.topSection}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={onGoBack} style={styles.backButton}>
                            <Ionicons name='chevron-back' size={24} color='black' />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Preview</Text>
                    </View>

                    <View style={styles.previewWrapper}>
                        {avatarUri ? (
                            <Image source={{ uri: avatarUri }} style={styles.avatar} />
                        ) : (
                            <View style={[styles.avatar, styles.placeholder]}>
                                <Text style={styles.placeholderText}>No image selected</Text>
                            </View>
                        )}
                    </View>

                    <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
                        <Ionicons name='crop-outline' size={20} color='black' />
                        <Text style={styles.editText}>Edit</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.bottomSection}>
                    <GradientButton style={styles.saveButton} Square onPress={handleSavePress}>
                        <Text style={styles.saveText}>Save</Text>
                    </GradientButton>
                </View>
            </View>

            {avatarUri && (
                <ImageEditor
                    isVisible={isEditorVisible}
                    imageUri={avatarUri}
                    onEditingCancel={() => setEditorVisible(false)}
                    onEditingComplete={handleCropComplete}
                />
            )}
        </View>
    )
}

const AVATAR_SIZE = 300

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    content: {
        flex: 1,
        justifyContent: 'space-between'
    },
    topSection: {
        flex: 1,
        paddingHorizontal: 20
    },
    bottomSection: {
        borderTopWidth: 1,
        borderTopColor: '#DDDADA',
        paddingHorizontal: 20
    },
    header: {
        alignItems: 'flex-start',
        paddingVertical: 16
    },
    backButton: {},
    headerTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#1D1617'
    },
    previewWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40
    },
    avatar: {
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        borderRadius: AVATAR_SIZE / 2,
        backgroundColor: '#f0f0f0',
        borderWidth: 1,
        borderColor: '#F7F8F8'
    },
    placeholder: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    placeholderText: {
        color: '#888'
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    editText: {
        marginLeft: 8,
        fontSize: 16
    },
    saveButton: {
        marginTop: 20
    },
    saveText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500'
    }
})
