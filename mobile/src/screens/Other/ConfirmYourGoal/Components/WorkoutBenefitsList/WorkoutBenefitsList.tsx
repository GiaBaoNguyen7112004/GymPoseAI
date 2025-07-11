import Icon from '@/components/Icon'
import { DATA_GOAL } from '@/constants/common.constants'
import { SCREEN_WIDTH } from '@/constants/devices.constant'
import { IconName } from '@/constants/icon.constants'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useRef } from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'

const ITEM_WIDTH = SCREEN_WIDTH * 0.7
const ITEM_HEIGHT = 478
const SPACING = 0

export default function WorkoutGoalCarousel() {
    const scrollX = useRef(new Animated.Value(0)).current

    return (
        <View style={styles.container}>
            <Animated.FlatList
                scrollEnabled={true}
                data={DATA_GOAL}
                horizontal
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                snapToInterval={ITEM_WIDTH}
                decelerationRate='fast'
                scrollEventThrottle={16}
                contentContainerStyle={{
                    paddingHorizontal: (SCREEN_WIDTH - ITEM_WIDTH) / 2,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                    useNativeDriver: true
                })}
                renderItem={({ item, index }) => {
                    const inputRange = [
                        (index - 1) * (ITEM_WIDTH + SPACING),
                        index * (ITEM_WIDTH + SPACING),
                        (index + 1) * (ITEM_WIDTH + SPACING)
                    ]

                    const scale = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.8, 1, 0.8],
                        extrapolate: 'clamp'
                    })

                    return (
                        <Animated.View style={[styles.itemWrapper, { transform: [{ scale }] }]}>
                            <LinearGradient
                                colors={['#92A3FD', '#9DCEFF']}
                                start={{ x: 1, y: 0.5 }}
                                end={{ x: 0, y: 0.5 }}
                                style={styles.itemContainer}
                            >
                                <Icon name={item.nameIcon as IconName} size={234} style={styles.image} />
                                <View>
                                    <Text style={styles.itemTitle}>{item.title}</Text>
                                    <View style={styles.separate}></View>
                                    <Text style={styles.itemDesc}>{item.desc}</Text>
                                </View>
                            </LinearGradient>
                        </Animated.View>
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        height: ITEM_HEIGHT + 10,
        justifyContent: 'center'
    },
    itemWrapper: {
        marginHorizontal: SPACING / 2,
        shadowColor: 'rgba(197, 139, 242, 1)',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 22,
        elevation: 10
    },
    itemContainer: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        borderRadius: 22,
        backgroundColor: '#92A3FD',
        overflow: 'hidden',
        alignItems: 'center',
        marginHorizontal: SPACING / 2,
        shadowColor: 'rgba(197, 139, 242, 0.30)',
        shadowOpacity: 1,
        shadowRadius: 22,
        shadowOffset: { width: 0, height: 10 },
        elevation: 10
    },
    image: {
        marginTop: 36
    },
    itemTitle: {
        marginTop: 40,
        color: '#FFF',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 21
    },
    separate: {
        marginTop: 3,
        width: 50,
        height: 1,
        backgroundColor: '#FFF',
        alignSelf: 'center'
    },
    itemDesc: {
        marginTop: 20,
        color: '#FFF',
        textAlign: 'center',
        fontSize: 12,
        fontWeight: 400,
        lineHeight: 18,
        width: 215
    }
})
