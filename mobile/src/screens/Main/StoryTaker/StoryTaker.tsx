import { useIsFocused, RouteProp, useNavigation } from '@react-navigation/native'
import React, { useRef, useState, useEffect } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, Animated, FlatList, ScrollView } from 'react-native'
import { Camera, CameraView, FlashMode } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { SCREEN_HEIGHT, SCREEN_WIDTH, useStatusBarHeight } from '@/src/constants/devices.constant'
import { PanGestureHandler, PanGestureHandlerGestureEvent, State } from 'react-native-gesture-handler'
import { MainTabParamList } from '@/src/navigation/MainTabs'
import NavigationBar from '@/src/components/NavigationBar/NavigationBar'

type StoryTakerRouteProp = RouteProp<MainTabParamList, 'StoryTaker'>

type StoryTakerProps = {
    route: StoryTakerRouteProp
}

export type StoryImageSpec = {
    width: number
    height: number
    uri: string
    base64: string
    extension: string
}

const StoryTaker = ({ route }: StoryTakerProps) => {
    const focused = useIsFocused()
    const [page, setPage] = useState<number>(1)
    const [showGallery, setShowGallery] = useState<boolean>(false)
    const [front, setFront] = useState<boolean>(true)
    const [flash, setFlash] = useState<FlashMode>()
    const [groups, setGroups] = useState<string[]>([])
    const [multiple, setMultiple] = useState<boolean>(false)
    const [selectedPhotos, setSelectedPhotos] = useState<number[]>([])
    const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([])
    const [selectedIndex, setSelectedIndex] = useState<number>(-1)
    const [selectedGroupIndex, setSelectedGroupIndex] = useState<number>(-1)
    const _cameraRef = useRef<CameraView>(null)
    const _galleryOffsetY = React.useMemo(() => new Animated.Value(0), [])
    const _groupsOffsetX = React.useMemo(() => new Animated.Value(0), [])
    const _hScrollRef = useRef<ScrollView>(null)
    const ref = useRef<{
        preGalleryOffsetY: number
        showGroups: boolean
    }>({
        preGalleryOffsetY: 0,
        showGroups: false
    })
    const navigation = useNavigation()
    const [hasPermission, setHasPermission] = useState<boolean>(false)

    useEffect(() => {
        ;(async () => {
            const { status } = await Camera.requestCameraPermissionsAsync()
            const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync()
            setHasPermission(status === 'granted' && mediaLibraryStatus.status === 'granted')
        })()
    }, [])

    useEffect(() => {
        if (focused && hasPermission) {
            MediaLibrary.getAlbumsAsync().then((albums) => {
                const groupList = albums.map((album) => album.title)
                setGroups(groupList)
                if (groupList.length > 0) setSelectedGroupIndex(0)
            })
        }
    }, [focused, hasPermission])

    useEffect(() => {
        if (selectedGroupIndex > -1 && hasPermission) {
            MediaLibrary.getAssetsAsync({
                album: groups[selectedGroupIndex],
                first: 9 * page,
                mediaType: MediaLibrary.MediaType.photo
            }).then((result) => {
                setPhotos(result.assets)
                if (result.assets.length > 0 && selectedIndex < 0) setSelectedIndex(0)
            })
        }
    }, [selectedGroupIndex, page, hasPermission])

    const _onTakePhoto = async () => {
        if (_cameraRef.current) {
            try {
                const photo = await _cameraRef.current.takePictureAsync({
                    quality: 1,
                    base64: true
                })

                const asset = await MediaLibrary.createAssetAsync(photo.uri)
                console.log('Photo saved to Media Library:', asset)

                // Cập nhật lại danh sách ảnh
                if (selectedGroupIndex > -1 && hasPermission) {
                    const result = await MediaLibrary.getAssetsAsync({
                        album: groups[selectedGroupIndex],
                        first: 9 * page,
                        mediaType: MediaLibrary.MediaType.photo
                    })
                    setPhotos(result.assets)
                    setSelectedIndex(0)
                }
            } catch (error) {
                console.error('Error saving photo to Media Library:', error)
            }
        }
    }

    const _onGestureEvent = ({ nativeEvent: { translationY } }: PanGestureHandlerGestureEvent) => {
        if (
            ref.current.preGalleryOffsetY + translationY < -SCREEN_HEIGHT + 170 ||
            ref.current.preGalleryOffsetY + translationY > 0
        )
            return
        _galleryOffsetY.setValue(ref.current.preGalleryOffsetY + translationY)
    }

    const _onStateChange = ({ nativeEvent: { translationY, state } }: PanGestureHandlerGestureEvent) => {
        if (state === State.END) {
            if (ref.current.preGalleryOffsetY + translationY < (-SCREEN_HEIGHT + 170) / 2) {
                Animated.timing(_galleryOffsetY, {
                    duration: 200,
                    toValue: -SCREEN_HEIGHT + 170,
                    useNativeDriver: true
                }).start(() => {
                    if (!showGallery) setShowGallery(true)
                })
                ref.current.preGalleryOffsetY = -SCREEN_HEIGHT + 170
            } else {
                Animated.timing(_galleryOffsetY, { duration: 200, toValue: 0, useNativeDriver: true }).start(() => {
                    if (showGallery) setShowGallery(false)
                })
                ref.current.preGalleryOffsetY = 0
            }
        }
    }

    const _onLoadmore = () => {
        setPage(page + 1)
    }

    const _onSelectImage = (index: number) => {
        if (multiple) {
            const position = selectedPhotos.indexOf(index)
            if (position > -1) {
                const temp = [...selectedPhotos]
                temp.splice(position, 1)
                setSelectedPhotos(temp)
            } else {
                const temp = [...selectedPhotos]
                temp.push(index)
                setSelectedPhotos(temp)
            }
        } else {
            const images: StoryImageSpec[] = [
                {
                    width: photos[index].width,
                    height: photos[index].height,
                    uri: photos[index].uri,
                    base64: '',
                    extension: photos[index].filename.split('.').pop() || 'jpg'
                }
            ]
            console.log('Single image selected: ', images) // Xử lý ảnh đơn đã chọn, ví dụ: chuyển sang màn hình chỉnh sửa
        }
    }

    const _onShowGroups = () => {
        if (ref.current.showGroups) {
            Animated.timing(_groupsOffsetX, { duration: 150, toValue: 0, useNativeDriver: true }).start()
        } else {
            Animated.spring(_groupsOffsetX, { toValue: 150, useNativeDriver: true }).start()
        }
        ref.current.showGroups = !ref.current.showGroups
    }

    const _onShowGallery = () => {
        Animated.timing(_galleryOffsetY, { duration: 200, toValue: -SCREEN_HEIGHT + 170, useNativeDriver: true }).start(
            () => {
                if (!showGallery) setShowGallery(true)
            }
        )
        ref.current.preGalleryOffsetY = -SCREEN_HEIGHT + 170
    }

    const _onHideGallery = () => {
        Animated.timing(_galleryOffsetY, { duration: 200, toValue: 0, useNativeDriver: true }).start(() => {
            if (showGallery) setShowGallery(false)
        })
        ref.current.preGalleryOffsetY = 0
    }

    const _onSelectGroup = (index: number) => {
        setSelectedGroupIndex(index)
        Animated.timing(_groupsOffsetX, { duration: 150, toValue: 0, useNativeDriver: true }).start()
        ref.current.showGroups = !ref.current.showGroups
    }

    const _onDoneMultiSelect = () => {
        const images: StoryImageSpec[] = selectedPhotos.map((photoIndex) => ({
            width: photos[photoIndex].width,
            height: photos[photoIndex].height,
            uri: photos[photoIndex].uri,
            base64: '',
            extension: photos[photoIndex].filename.split('.').pop() || 'jpg'
        }))
        console.log('Multiple images selected: ', images)
    }

    if (hasPermission === null) {
        return <View />
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>
    }

    const statusBarHeight = useStatusBarHeight()

    return (
        <>
            <PanGestureHandler onGestureEvent={_onGestureEvent} onHandlerStateChange={_onStateChange}>
                <View style={styles.container}>
                    {focused && hasPermission && (
                        <CameraView
                            ratio='16:9'
                            pictureSize='3840x2160'
                            ref={_cameraRef}
                            style={styles.cameraContainer}
                        />
                    )}

                    <View
                        style={[
                            styles.topOptions,
                            {
                                top: statusBarHeight
                            }
                        ]}
                    >
                        <TouchableOpacity style={styles.btnTopOptions}>
                            <Icon name='tune' size={30} color='#fff' />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnTopOptions}></TouchableOpacity>
                        <TouchableOpacity style={styles.btnTopOptions} onPress={() => navigation.goBack()}>
                            <Text
                                style={{
                                    fontSize: 30,
                                    color: '#fff'
                                }}
                            >
                                ✕
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Animated.View
                        style={{
                            ...styles.bottomOptions,
                            transform: [
                                {
                                    translateY: _galleryOffsetY
                                }
                            ],
                            zIndex: showGallery ? 0 : 2,
                            opacity: _galleryOffsetY.interpolate({
                                inputRange: [-SCREEN_HEIGHT + 170, 0],
                                outputRange: [0, 1]
                            })
                        }}
                    >
                        <TouchableOpacity onPress={_onShowGallery} activeOpacity={0.8} style={styles.btnLastPhoto}>
                            <Image
                                style={styles.lastPhoto}
                                source={{
                                    uri: photos[0]?.uri
                                }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={_onTakePhoto} activeOpacity={0.7} style={styles.btnTakePhoto}>
                            <View
                                style={{
                                    width: 70,
                                    height: 70,
                                    borderRadius: 70,
                                    backgroundColor: '#fff',
                                    borderColor: '#000',
                                    borderWidth: 4
                                }}
                            />
                            {/* {sendToDirect && username && (
                                <View style={styles.sendTo}>
                                    <Text
                                        style={{
                                            color: '#fff'
                                        }}
                                    >
                                        Message{' '}
                                        <Text
                                            style={{
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            {username}
                                        </Text>
                                    </Text>
                                </View>
                            )} */}
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => setFront(!front)}>
                            <Icon name='camera-retake' size={40} color='#fff' />
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View
                        style={{
                            ...styles.galleryInfo,
                            transform: [
                                {
                                    translateY: _galleryOffsetY
                                }
                            ],
                            zIndex: 1,
                            opacity: _galleryOffsetY.interpolate({
                                inputRange: [-SCREEN_HEIGHT + 170, 0],
                                outputRange: [1, 0]
                            })
                        }}
                    >
                        <NavigationBar title='Your Gallery' callback={_onHideGallery} />
                        <View
                            style={[
                                styles.galleryOptionsWrapper,
                                {
                                    height: 170 - statusBarHeight - 44
                                }
                            ]}
                        >
                            <TouchableOpacity
                                onPress={_onShowGroups}
                                activeOpacity={0.8}
                                style={{
                                    ...styles.btnGalleryOption,
                                    borderTopRightRadius: 44,
                                    borderBottomRightRadius: 44
                                }}
                            >
                                <Text
                                    style={{
                                        fontWeight: '600',
                                        color: '#318bfb'
                                    }}
                                >
                                    {groups[selectedGroupIndex]}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => setMultiple(!multiple)}
                                style={{
                                    ...styles.btnGalleryOption,
                                    borderTopLeftRadius: 44,
                                    borderBottomLeftRadius: 44
                                }}
                            >
                                <Icon name='layers-outline' size={30} color={multiple ? '#318bfb' : '#999'} />
                                <Text
                                    style={{
                                        fontWeight: '600',
                                        color: multiple ? '#318bfb' : '#999'
                                    }}
                                >
                                    Multiple
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Animated.View
                            style={{
                                position: 'absolute',
                                top: 170,
                                left: -150,
                                width: 150,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#fff',
                                borderWidth: 1,
                                borderColor: '#ddd',
                                borderLeftWidth: 0,
                                transform: [
                                    {
                                        translateX: _groupsOffsetX
                                    }
                                ]
                            }}
                        >
                            <FlatList
                                data={groups}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity onPress={() => _onSelectGroup(index)} style={styles.btnGroup}>
                                        <Text
                                            style={{
                                                fontWeight: index === selectedGroupIndex ? '600' : '500',
                                                color: index === selectedGroupIndex ? '#000' : '#666'
                                            }}
                                        >
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item, index) => `${index}`}
                            />
                        </Animated.View>
                    </Animated.View>
                    <Animated.View
                        style={{
                            ...styles.imageGalleryWrapper,
                            transform: [
                                {
                                    translateY: _galleryOffsetY
                                }
                            ]
                        }}
                    >
                        <FlatList
                            onEndReached={_onLoadmore}
                            style={styles.galleryList}
                            data={photos}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    onPress={() => _onSelectImage(index)}
                                    activeOpacity={0.8}
                                    style={{
                                        ...styles.imageWrapper,
                                        marginHorizontal: (index - 1) % 3 === 0 ? 2.5 : 0
                                    }}
                                >
                                    {multiple && (
                                        <View
                                            style={{
                                                position: 'absolute',
                                                right: 7.5,
                                                top: 7.5,
                                                height: 24,
                                                width: 24,
                                                borderRadius: 24,
                                                borderColor: '#fff',
                                                borderWidth: 1,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                zIndex: 1,
                                                backgroundColor:
                                                    selectedPhotos.indexOf(index) > -1 ? '#318bfb' : 'rgba(0,0,0,0.3)'
                                            }}
                                        >
                                            {selectedPhotos.indexOf(index) > -1 && (
                                                <Text
                                                    style={{
                                                        color: '#fff'
                                                    }}
                                                >
                                                    {selectedPhotos.indexOf(index) + 1}
                                                </Text>
                                            )}
                                        </View>
                                    )}
                                    <Image
                                        source={{
                                            uri: item.uri
                                        }}
                                        style={{
                                            width: '100%',
                                            height: '100%'
                                        }}
                                    />
                                </TouchableOpacity>
                            )}
                            numColumns={3}
                            onEndReachedThreshold={0.5}
                            keyExtractor={(item, index) => `${index}`}
                        />
                        {multiple && (
                            <View
                                style={{
                                    ...styles.selectedImageWrapper
                                }}
                            >
                                <ScrollView
                                    ref={_hScrollRef}
                                    onContentSizeChange={() => {
                                        _hScrollRef.current?.scrollToEnd()
                                    }}
                                    style={{
                                        maxWidth: SCREEN_WIDTH - 100
                                    }}
                                    bounces={false}
                                    horizontal={true}
                                >
                                    {selectedPhotos.map((photoIndex: number, index: number) => (
                                        <Image
                                            key={index}
                                            source={{
                                                uri: photos[photoIndex].uri
                                            }}
                                            style={styles.previewMultiImage}
                                        />
                                    ))}
                                </ScrollView>
                                <TouchableOpacity
                                    disabled={selectedPhotos.length < 1}
                                    onPress={_onDoneMultiSelect}
                                    activeOpacity={0.8}
                                    style={styles.btnNext}
                                >
                                    <Text
                                        style={{
                                            fontWeight: '600'
                                        }}
                                    >
                                        Next
                                    </Text>
                                    <Icon name='chevron-right' size={20} />
                                </TouchableOpacity>
                            </View>
                        )}
                    </Animated.View>
                </View>
            </PanGestureHandler>
        </>
    )
}
export default StoryTaker

const styles = StyleSheet.create({
    container: {
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        backgroundColor: '#000'
    },
    cameraContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH
    },
    topOptions: {
        left: 0,
        height: 60,
        width: SCREEN_WIDTH,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    btnTopOptions: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomOptions: {
        height: 80,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(255,255,255,0.2)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    galleryInfo: {
        height: 170,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: '#fff'
    },
    btnLastPhoto: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 2
    },
    lastPhoto: {
        width: 30,
        height: 30,
        borderRadius: 5
    },
    btnTakePhoto: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        width: 80,
        borderRadius: 80,
        backgroundColor: '#fff',
        transform: [
            {
                translateY: -90
            }
        ]
    },
    sendTo: {
        position: 'absolute',
        bottom: 90,
        width: 200,
        left: (70 - 200) / 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageGalleryWrapper: {
        backgroundColor: '#000',
        height: SCREEN_HEIGHT,
        position: 'absolute',
        width: '100%',
        top: SCREEN_HEIGHT,
        left: 0
    },
    galleryList: {
        marginVertical: 1.25,
        maxHeight: SCREEN_HEIGHT - 170 - 2.5
    },
    imageWrapper: {
        width: (SCREEN_WIDTH - 5) / 3,
        height: 200,
        marginVertical: 1.25
    },
    galleryOptionsWrapper: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnGalleryOption: {
        height: 44,
        paddingHorizontal: 15,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#999',
        backgroundColor: 'rgb(250,250,250)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnGroup: {
        height: 44,
        paddingHorizontal: 15,
        justifyContent: 'center'
    },
    selectedImageWrapper: {
        paddingHorizontal: 5,
        bottom: 170,
        left: 0,
        position: 'absolute',
        width: '100%',
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
        zIndex: 10
    },
    previewMultiImage: {
        height: 54,
        width: 32,
        resizeMode: 'cover',
        borderRadius: 5,
        marginHorizontal: 5
    },
    btnNext: {
        marginRight: 10,
        width: 80,
        height: 44,
        backgroundColor: '#fff',
        borderRadius: 44,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    }
})
