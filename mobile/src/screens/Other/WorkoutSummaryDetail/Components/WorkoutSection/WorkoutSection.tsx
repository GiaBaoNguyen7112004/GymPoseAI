import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { formatReadableDateTime } from '@/utils/format.util'
import { User } from '@/types/user.type'
import { memo } from 'react'

interface HeaderSectionProps {
    userData?: User
    startTime: string
    progress: number
}

const WorkoutSection = ({ userData, startTime, progress }: HeaderSectionProps) => {
    return (
        <>
            <ImageBackground
                source={require('@/assets/images/background.jpg')}
                style={styles.userInfoBackground}
                imageStyle={styles.backgroundImage}
            >
                <View style={styles.userInfoWrapper}>
                    <View style={styles.userInfo}>
                        <Image
                            source={
                                userData?.avatar
                                    ? {
                                          uri: userData?.avatar
                                      }
                                    : require('@/assets/images/defaultAvatar.png')
                            }
                            style={styles.profileImage}
                        />
                        <View>
                            <Text style={styles.userName}>
                                {(userData?.first_name ?? '_ _') + ' ' + (userData?.last_name ?? '_ _')}
                            </Text>
                            <Text style={styles.date}>{formatReadableDateTime(startTime)}</Text>
                        </View>
                    </View>
                    <View style={styles.distanceContainer}>
                        <View>
                            <View style={styles.progressRow}>
                                <Text style={styles.distanceValue}>{progress}</Text>
                                <Text style={styles.distanceUnit}>%</Text>
                            </View>
                            <Text style={styles.progressLabel}>Progress</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </>
    )
}

const styles = StyleSheet.create({
    userInfoBackground: {
        padding: 15,
        overflow: 'hidden',
        marginTop: 12
    },
    backgroundImage: {
        resizeMode: 'cover'
    },
    userInfoWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    userInfo: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    profileImage: {
        width: 45,
        height: 45,
        borderRadius: 30,
        marginRight: 12,
        borderWidth: 1,
        borderColor: '#fff'
    },
    userName: {
        fontSize: 18,
        fontWeight: '500',
        color: '#fff'
    },
    date: {
        marginTop: 1,
        color: '#ADA4A5',
        fontSize: 13
    },
    distanceContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    progressRow: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    distanceValue: {
        fontSize: 48,
        fontWeight: '400',
        color: '#fff'
    },
    distanceUnit: {
        fontSize: 32,
        marginBottom: 8,
        marginLeft: 4,
        color: '#fff'
    },
    progressLabel: {
        fontSize: 13,
        color: '#ADA4A5',
        textAlign: 'center',
        marginTop: 4
    }
})

export default memo(WorkoutSection)
